const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'nagyon_titkos_kulcs_szabolcs_k_sushi_projekt_2025',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

/* =======================
   MYSQL KAPCSOLAT
======================= */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'k_sushi'
});

connection.connect(err => {
    if (err) {
        console.error('Adatbázis csatlakozási hiba:', err);
        return;
    }
    console.log('✅ Csatlakozva az adatbázishoz');
});

/* =======================
   STATIKUS FÁJLOK
======================= */
app.use(express.static(__dirname));

/* =======================
   OLDALAK
======================= */
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/menu', (req, res) => res.sendFile(path.join(__dirname, 'menu.html')));
app.get('/kosar', (req, res) => res.sendFile(path.join(__dirname, 'kosar.html')));

/* =======================
   API - ÉTLAP
======================= */
app.get('/api/etlap', (req, res) => {
    connection.query('SELECT * FROM etlap', (err, results) => {
        if (err) return res.status(500).json({ hiba: 'Adatbázis hiba' });
        res.json(results);
    });
});

/* =======================
   REGISZTRÁCIÓ
======================= */
app.post('/api/regisztracio', async (req, res) => {
    try {
        const { lastname, firstname, email, phone, address, password } = req.body;

        if (!lastname || !firstname || !email || !password) {
            return res.status(400).json({ hiba: 'Hiányzó adatok' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        connection.query(
            `INSERT INTO vasarlo 
            (vezetek_nev, kereszt_nev, email_cim, telefonszam, vasarlo_cime, jelszo)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [lastname, firstname, email, phone || null, address || null, hashedPassword],
            err => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ hiba: 'Email már foglalt' });
                    }
                    return res.status(500).json({ hiba: 'Adatbázis hiba' });
                }
                res.json({ uzenet: 'Sikeres regisztráció!' });
            }
        );
    } catch (err) {
        res.status(500).json({ hiba: 'Szerver hiba' });
    }
});

/* =======================
   BEJELENTKEZÉS – IDE ILLÉSZTEM BE AZ UZENET KULCSOT
======================= */
app.post('/api/bejelentkezes', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ hiba: 'Hiányzó adatok' });
    }

    connection.query(
        'SELECT * FROM vasarlo WHERE email_cim = ?',
        [email],
        async (err, results) => {
            if (err || results.length === 0) {
                return res.status(401).json({ hiba: 'Hibás email vagy jelszó' });
            }

            const user = results[0];
            const match = await bcrypt.compare(password, user.jelszo);

            if (!match) {
                return res.status(401).json({ hiba: 'Hibás email vagy jelszó' });
            }

            // Sikeres bejelentkezés
            req.session.userId = user.id;

            res.json({
                siker: true,
                uzenet: 'Sikeres bejelentkezés!',  // <--- EZ A SOR BEKERÜLT – EZ OLDJA MEG AZ UNDEFINED ALERTET
                user: {
                    nev: `${user.vezetek_nev} ${user.kereszt_nev}`,
                    email: user.email_cim,
                    telefonszam: user.telefonszam,
                    cim: user.vasarlo_cime
                }
            });
        }
    );
});

/* =======================
   PROFIL
======================= */
app.get('/api/profil', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ hiba: 'Nincs bejelentkezve' });
    }

    connection.query(
        `SELECT 
            CONCAT(vezetek_nev, ' ', kereszt_nev) AS nev,
            telefonszam,
            vasarlo_cime AS cim,
            email_cim AS email
         FROM vasarlo WHERE id = ?`,
        [req.session.userId],
        (err, results) => {
            if (err || results.length === 0) {
                return res.status(500).json({ hiba: 'Profil hiba' });
            }
            res.json(results[0]);
        }
    );
});

/* =======================
   RENDELÉS
======================= */
app.post('/api/rendeles', (req, res) => {
    console.log('RENDELÉS - bejövő adatok:', req.body);

    try {
        const { nev, telefonszam, cim, megjegyzes, fizetesi_mod, tetelek } = req.body;

        if (!nev || !cim || !Array.isArray(tetelek) || tetelek.length === 0) {
            console.log('Hiányzó vagy hibás adatok:', { nev, telefonszam, cim, tetelek });
            return res.status(400).json({ hiba: 'Hiányzó vagy hibás adatok' });
        }

        // Ha be van jelentkezve, használjuk a vasarlo_id-t
        const vasarloId = req.session.userId || null;

        let osszeg = 0;
        tetelek.forEach(t => {
            const ar = Number(t.egyseg_ar) || 0;
            const db = Number(t.darab) || 1;
            osszeg += ar * db;
        });

        const values = tetelek.map(t => [
            vasarloId,
            nev,
            t.nev,
            t.egyseg_ar,
            cim
        ]);

        connection.query(
            `INSERT INTO rendeles
             (vasarlo_id, vasarlo_neve, etel_neve, etel_ar, vasarlo_cime)
             VALUES ?`,
            [values],
            (err) => {
                if (err) {
                    console.error('Rendelés INSERT hiba:', err);
                    return res.status(500).json({ hiba: 'Adatbázis hiba', details: err.message });
                }

                console.log('Rendelés sikeresen mentve');
                res.json({ siker: true, uzenet: 'Rendelés sikeresen leadva!' });
            }
        );
    } catch (err) {
        console.error('RENDELÉS TELJES HIBA:', err);
        res.status(500).json({ hiba: 'Szerver hiba', details: err.message });
    }
});

/* =======================
   SERVER INDÍTÁS
======================= */
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Szerver fut: http://localhost:${PORT}`);
});