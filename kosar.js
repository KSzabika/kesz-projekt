// kosar.js – teljes, javított és működő verzió

// Kosár betöltése és táblázat frissítése
function renderKosar() {
    const kosar = JSON.parse(localStorage.getItem('kosar')) || [];
    const tbody = document.getElementById('cart-body');
    const totalSpan = document.getElementById('total');

    if (!tbody || !totalSpan) return;

    tbody.innerHTML = '';

    if (kosar.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 2rem;">A kosarad üres</td></tr>';
        totalSpan.textContent = '0 Ft';
        return;
    }

    let osszesen = 0;

    kosar.forEach((tetel, index) => {
        // Biztonságos konverzió – ez oldja meg a NaN/undefined problémát
        const egysegAr = Number(tetel.ara) || 0;
        const darab = Number(tetel.darab) || 1;
        const osszAr = egysegAr * darab;

        osszesen += osszAr;

        const sor = document.createElement('tr');
        sor.innerHTML = `
            <td>${tetel.nev || 'Ismeretlen termék'}</td>
            <td style="text-align:center;">${darab} db</td>
            <td style="text-align:right;">${osszAr.toLocaleString('hu-HU')} Ft</td>
            <td>
                <button class="btn red torles" data-index="${index}">Eltávolítás</button>
            </td>
        `;
        tbody.appendChild(sor);
    });

    totalSpan.textContent = osszesen.toLocaleString('hu-HU') + ' Ft';
}

// Egy termék törlése
function torles(index) {
    let kosar = JSON.parse(localStorage.getItem('kosar')) || [];
    kosar.splice(index, 1);
    localStorage.setItem('kosar', JSON.stringify(kosar));
    renderKosar();
}

// Eseménykezelők
document.addEventListener('DOMContentLoaded', () => {
    renderKosar();

    // Törlés gombok (delegálás – dinamikus gombokra is működik)
    document.getElementById('cart-body')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('torles')) {
            const index = parseInt(e.target.dataset.index);
            torles(index);
        }
    });

    // Tovább a rendeléshez gomb
    const tovabbGomb = document.getElementById('tovabb-rendeles');
    if (tovabbGomb) {
        tovabbGomb.addEventListener('click', () => {
            const kosar = JSON.parse(localStorage.getItem('kosar')) || [];

            if (kosar.length === 0) {
                alert('A kosarad üres! Előbb tegyél bele valamit.');
                return;
            }

            // Átirányítás a rendelés oldalra
            window.location.href = 'rendeles.html';
        });
    }
});