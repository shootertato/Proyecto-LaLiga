let data = standings;
let resultado = data.standings[0].table;

function clasificacion(resultado) {
  let tblBody = document.getElementById("clasificacion_body");

  for (let i = 0; i < resultado.length; i++) {
    let hilera = document.createElement("tr");

    let celda = document.createElement("td");
    let textoCelda = document.createTextNode(resultado[i].position);

    let esqudo = document.createElement("img");
    esqudo.setAttribute("src", resultado[i].team.crestUrl);
    esqudo.setAttribute("alt", "escudo equipo");
    esqudo.width = 40;

    let celda0 = document.createElement("td");
    let textoCelda0 = document.createTextNode(resultado[i].team.name);

    let celda1 = document.createElement("td");
    let textoCelda1 = document.createTextNode(resultado[i].points);

    let celda2 = document.createElement("td");
    let textoCelda2 = document.createTextNode(resultado[i].playedGames);

    let celda3 = document.createElement("td");
    let textoCelda3 = document.createTextNode(resultado[i].won);

    let celda4 = document.createElement("td");
    let textoCelda4 = document.createTextNode(resultado[i].draw);

    let celda5 = document.createElement("td");
    let textoCelda5 = document.createTextNode(resultado[i].lost);

    let celda6 = document.createElement("td");
    let textoCelda6 = document.createTextNode(resultado[i].goalsFor);

    let celda7 = document.createElement("td");
    let textoCelda7 = document.createTextNode(resultado[i].goalsAgainst);

    let celda8 = document.createElement("td");
    let textoCelda8 = document.createTextNode(resultado[i].goalDifference);

    let celda9 = document.createElement("td");

    let celda10 = document.createElement("td");

    celda.classList.add("posicion");

    celda.appendChild(textoCelda);
    celda1.appendChild(esqudo);
    celda1.appendChild(textoCelda0);
    celda2.appendChild(textoCelda1);
    celda3.appendChild(textoCelda2);
    celda4.appendChild(textoCelda3);
    celda5.appendChild(textoCelda4);
    celda6.appendChild(textoCelda5);
    celda7.appendChild(textoCelda6);
    celda8.appendChild(textoCelda7);
    celda9.appendChild(textoCelda8);

    let form = resultado[i].form;
    let arrayForm = form.split(",");

    for (let j = 0; j < arrayForm.length; j++) {
      let div = document.createElement("div");
      let textoCelda9 = document.createTextNode(arrayForm[j]);

      div.appendChild(textoCelda9);
      celda10.appendChild(div);

      div.classList.add("ultimosPartidos");
      if (arrayForm[j] == "W") {
        div.setAttribute("class", "win");
      } else if (arrayForm[j] == "D") {
        div.setAttribute("class", "draw");
      } else if (arrayForm[j] == "L") {
        div.setAttribute("class", "lose");
      }
    }

    hilera.appendChild(celda);
    hilera.appendChild(celda1);
    hilera.appendChild(celda2);
    hilera.appendChild(celda3);
    hilera.appendChild(celda4);
    hilera.appendChild(celda5);
    hilera.appendChild(celda6);
    hilera.appendChild(celda7);
    hilera.appendChild(celda8);
    hilera.appendChild(celda9);
    hilera.appendChild(celda10);

    tblBody.appendChild(hilera);
  }
}

function getFetch(){
  const url = "http://api.football-data.org/v2/competitions/2014/standings";
  fetch(url,{
      method: "GET",
      headers: {
          "X-Auth-Token": "3c3cf5121aca408783e167b985e62751"
      }
  }).then(response =>{
      if(response.ok) return response.json();
  }).then(data=>{
      let tablaFetch = data.standings[0].table

   clasificacion(tablaFetch) 
  })
}
getFetch()