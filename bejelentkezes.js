document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.auth-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Email és jelszó kötelező!');
            return;
        }

        try {
            const res = await fetch('/api/bejelentkezes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            let data;
            try {
                data = await res.json();
            } catch {
                const text = await res.text();
                console.error('Nem JSON válasz:', text);
                return alert('Szerver hiba: ' + (text || 'Ismeretlen hiba'));
            }

            if (res.ok && data.siker) {
                alert(data.uzenet || 'Sikeres bejelentkezés!');  // most már van uzenet
                // Opcionális: mentsd el a user adatokat
                localStorage.setItem('bejelentkezettFelhasznalo', JSON.stringify(data.user));
                window.location.href = 'index.html';
            } else {
                alert(data.hiba || 'Bejelentkezés sikertelen');
            }
        } catch (err) {
            console.error('Bejelentkezési hiba:', err);
            alert('Nem sikerült kapcsolódni a szerverhez');
        }
    });
});