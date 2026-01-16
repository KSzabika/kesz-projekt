// rendeles.js – teljes, javított verzió

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rendeles-form');
    const tetelekTbody = document.getElementById('rendeles-tetelek');
    const osszegSpan = document.getElementById('rendeles-osszeg');

    let kosar = JSON.parse(localStorage.getItem('kosar')) || [];

    // 1. Ha van bejelentkezett felhasználó → kitöltjük az adatokat (localStorage-ból)
    const felhasznalo = JSON.parse(localStorage.getItem('bejelentkezettFelhasznalo'));
    if (felhasznalo) {
        document.getElementById('nev').value = felhasznalo.nev || '';
        document.getElementById('telefonszam').value = felhasznalo.telefonszam || '';
        document.getElementById('cim').value = felhasznalo.cim || '';
        console.log('Automatikus kitöltés sikeres:', felhasznalo.nev);
    }

    // 2. Kosár tartalom renderelése
    function renderRendelesTetelek() {
        if (!tetelekTbody || !osszegSpan) return;

        tetelekTbody.innerHTML = '';
        let osszesen = 0;

        if (kosar.length === 0) {
            tetelekTbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:2rem;">A kosár üres – kérlek menj vissza a menübe</td></tr>';
            osszegSpan.textContent = '0 Ft';
            if (form) form.style.display = 'none';
            return;
        }

        kosar.forEach(tetel => {
            // Biztonságos konverzió – ez oldja meg a NaN / undefined problémát
            const egysegAr = Number(tetel.ara) || 0;
            const darab = Number(tetel.darab) || 1;
            const osszAr = egysegAr * darab;

            osszesen += osszAr;

            const sor = document.createElement('tr');
            sor.innerHTML = `
                <td>${tetel.nev || 'Ismeretlen termék'}</td>
                <td style="text-align:center;">${darab} db</td>
                <td style="text-align:right;">${osszAr.toLocaleString('hu-HU')} Ft</td>
            `;
            tetelekTbody.appendChild(sor);
        });

        osszegSpan.textContent = osszesen.toLocaleString('hu-HU') + ' Ft';
    }

    // Kosár azonnali megjelenítése
    renderRendelesTetelek();

    // 3. Form beküldése (rendelés leadása)
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (kosar.length === 0) {
                alert('A kosár üres!');
                return;
            }

            // Ellenőrizzük, hogy minden kötelező mező ki van-e töltve
            const nev = document.getElementById('nev')?.value.trim();
            const telefonszam = document.getElementById('telefonszam')?.value.trim();
            const cim = document.getElementById('cim')?.value.trim();

            if (!nev || !telefonszam || !cim) {
                alert('Kérlek töltsd ki a kötelező mezőket (Név, Telefonszám, Szállítási cím)!');
                return;
            }

            const adatok = {
                nev,
                telefonszam,
                cim,
                megjegyzes: document.getElementById('megjegyzes')?.value.trim() || '',
                fizetesi_mod: document.querySelector('input[name="fizetes"]:checked')?.value || 'keszpenz',
                tetelek: kosar.map(t => ({
                    nev: t.nev,
                    egyseg_ar: Number(t.ara) || 0,
                    darab: Number(t.darab) || 1
                }))
            };

            try {
                const res = await fetch('/api/rendeles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(adatok)
                });

                const valasz = await res.json();

                if (res.ok) {
                    alert(`Rendelés sikeresen leadva! Köszönjük! 😊\nRendelés azonosító: ${valasz.rendelesId || 'N/A'}`);
                    localStorage.removeItem('kosar');           // kosár kiürítése
                    window.location.href = '/';                 // vissza főoldalra
                } else {
                    alert('Hiba a rendelés leadásakor: ' + (valasz.hiba || 'Ismeretlen hiba'));
                }
            } catch (err) {
                console.error('Rendelés elküldési hiba:', err);
                alert('Nem sikerült elküldeni a rendelést. Ellenőrizd az internetkapcsolatot vagy próbáld újra később.');
            }
        });
    }
});