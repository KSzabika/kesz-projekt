document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.auth-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const lastname = document.getElementById('lastname').value;
        const firstname = document.getElementById('firstname').value;
        const email = document.getElementById('new-email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const password = document.getElementById('new-password').value;
        const confirm = document.getElementById('confirm-password').value;

        if(password !== confirm){
            alert("A jelszavak nem egyeznek!");
            return;
        }

        const adat = { lastname, firstname, email, phone, address, password };

        try {
            const res = await fetch('/api/regisztracio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(adat)
            });

            // Ha nem JSON jön, debugoljuk
            let data;
            try {
                data = await res.json();
            } catch(err){
                const text = await res.text();
                console.error("Nem JSON jött vissza:", text);
                return alert("Szerver hiba történt: " + text);
            }

            if(res.ok) alert(data.uzenet);
            else alert(data.hiba);

        } catch(err){
            console.error(err);
            alert("Hiba történt a regisztráció során");
        }
    });
});
