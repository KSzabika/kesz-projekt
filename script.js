/*
function kosarbaTeszem(nev, ar) {
  let kosar = getKosar();
  let termek = kosar.find(t => t.nev === nev);

  if (termek) {
    termek.mennyiseg++;
  } else {
    kosar.push({
      nev: nev,
      ar: ar,
      mennyiseg: 1
    });
  }

  mentKosar(kosar);
  alert("Hozzáadva a kosárhoz 🛒");
}
function kosarBetoltese() {
  const kosar = getKosar();
  const tablaTest = document.getElementById("cart-body");
  const vegosszegElem = document.getElementById("total");

  if (!tablaTest) return;

  tablaTest.innerHTML = "";
  let vegosszeg = 0;

  kosar.forEach((termek, index) => {
    let osszeg = termek.ar * termek.mennyiseg;
    vegosszeg += osszeg;

    tablaTest.innerHTML += `
      <tr>
        <td>${termek.nev}</td>
        
        <td>
          <input type="number" min="1" value="${termek.mennyiseg}"
            onchange="mennyisegValtozas(${index}, this.value)">
        </td>
        <td>${osszeg} Ft</td>
        <td>
          <button onclick="termekTorles(${index})">❌</button>
        </td>
      </tr>
    `;
  });

  vegosszegElem.textContent = vegosszeg + " Ft";
}
function mennyisegValtozas(index, ujMennyiseg) {
  let kosar = getKosar();
  kosar[index].mennyiseg = parseInt(ujMennyiseg);
  mentKosar(kosar);
  kosarBetoltese();
}
function termekTorles(index) {
  let kosar = getKosar();
  kosar.splice(index, 1);
  mentKosar(kosar);
  kosarBetoltese();
}
document.addEventListener("DOMContentLoaded", kosarBetoltese);
*/
function kosarbaTeszem(etelNev, etelAra) {
    let kosar = JSON.parse(localStorage.getItem('kosar')) || [];

    const megtalalt = kosar.find(t => t.nev === etelNev);

    if (megtalalt) {
        megtalalt.darab = (megtalalt.darab || 1) + 1;
    } else {
        kosar.push({
            nev: etelNev,
            ara: etelAra,
            darab: 1
        });
    }

    localStorage.setItem('kosar', JSON.stringify(kosar));
    alert(`${etelNev} hozzáadva (${etelAra} Ft)`)};