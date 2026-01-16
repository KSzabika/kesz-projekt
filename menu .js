function betoltKosar() {
    return JSON.parse(localStorage.getItem('kosar')) || [];
}

// majd ahol használod:
function kosarBetoltese() {
    const kosar = betoltKosar();
    // ... itt tovább építed a kosár tartalmát
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/etlap')
        .then(res => {
            if (!res.ok) throw new Error('Hálózati hiba: ' + res.status);
            return res.json();
        })
        .then(etlap => {
            const menuGrid = document.querySelector('.menu-grid');
            if (!menuGrid) {
                console.error("Nem található .menu-grid elem!");
                return;
            }
            menuGrid.innerHTML = '';

            etlap.forEach(etel => {
                const kartya = document.createElement('div');
                kartya.className = 'menu-card';
                kartya.innerHTML = `
                    <img src="${etel.etel_kepek_url}" alt="${etel.etel_neve}" onerror="this.src='https://via.placeholder.com/300x200?text=Nincs+kep'">
                    <h3>${etel.etel_neve}</h3>
                    <p class="price">${etel.etel_ara} Ft</p>
                    <button class="btn red" 
                        onclick="kosarbaTeszem('${etel.etel_neve.replace(/'/g, "\\'")}', ${etel.etel_ara})">
                        Kosárba
                    </button>
                `;
                menuGrid.appendChild(kartya);
            });
        })
        .catch(err => {
            console.error('Fetch hiba:', err);
            alert('Nem sikerült betölteni az étlapot :(');
        });
});

function kosarbaTeszem(nev, ara) {
    let kosar = JSON.parse(localStorage.getItem('kosar')) || [];
    kosar.push({ nev, ara });
    localStorage.setItem('kosar', JSON.stringify(kosar));
    alert(`${nev} hozzáadva! (${ara} Ft)`);
}