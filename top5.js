let data = matches;
let partidos = data.matches;

/* Hace las estadisticas de la tabla top 5 mejor*/

function topMejores(partidos) {
  let arrayNueva = [];

  for (let i = 0; i < partidos.length; i++) {
    let idLocal = partidos[i].homeTeam.id;
    let idVisitante = partidos[i].awayTeam.id;
    let equipoLocal = partidos[i].homeTeam.name;
    let equipoVisitante = partidos[i].awayTeam.name;
    let golesLocal = partidos[i].score.fullTime.homeTeam;
    let golesVisitante = partidos[i].score.fullTime.awayTeam;
    let estado = partidos[i].status;

    if (partidos[i].status === "FINISHED") {
      let foundHomeTeam = arrayNueva.find((element) => element.id === idLocal);
      let foundAwayTeam = arrayNueva.find(
        (element) => element.id === idVisitante
      );

      if (foundHomeTeam === undefined) {
        arrayNueva.push({
          id: idLocal,
          name: equipoLocal,
          goals: golesLocal,
          matches: 1,
        });
      } else {
        foundHomeTeam.goals += golesLocal;
        foundHomeTeam.matches += 1;
      }

      if (foundAwayTeam === undefined) {
        arrayNueva.push({
          id: idVisitante,
          name: equipoVisitante,
          goals: golesVisitante,
          matches: 1,
        });
      } else {
        foundAwayTeam.goals += golesVisitante;
        foundAwayTeam.matches += 1;
      }
    }
  }
  for (let j = 0; j < arrayNueva.length; j++) {
    let average = arrayNueva[j].goals / arrayNueva[j].matches;

    arrayNueva[j].average = average;
  }
  tablaTop5(arrayNueva);
}

/* Crea la tabla top 5 mejor*/

function tablaTop5(array) {
  
  let tblBody = document.getElementById("partidos_body");

  for (let i = 0; i < 5; i++) {
    let sortedByGolesContra = array.sort(function (a, b) {
      return b.average - a.average;
    });

    let tr = document.createElement("tr");

    let club = document.createElement("td");
    club.innerText = array[i].name;

    let goles = document.createElement("td");
    goles.innerText = array[i].goals;

    let partidos = document.createElement("td");
    partidos.innerText = array[i].matches;

    let promedio = document.createElement("td");
    promedio.innerText = array[i].average;

    tr.append(club);
    tr.append(goles);
    tr.append(partidos);
    tr.append(promedio);
    tblBody.append(tr);
  }
}

/* --------------------------- */

/* Crea la tabla y las estadisticas de la tabla top 5 peor*/

function getStats2(partidos) {
  let arrayNuevo2 = [];

  for (let i = 0; i < partidos.length; i++) {
    let idV = partidos[i].awayTeam.id;
    let eVisitante = partidos[i].awayTeam.name;
    let golesL = partidos[i].score.fullTime.homeTeam;
    let estado = partidos[i].status;

    if (estado === "FINISHED") {
    

    let foundAwayTeam = arrayNuevo2.find((element) => element.id === idV);

    if (foundAwayTeam === undefined) {
      arrayNuevo2.push({
        id: idV,
        name: eVisitante,
        goals: golesL,
        matches: 1,
      });
    } else {
      foundAwayTeam.goals += golesL;
      foundAwayTeam.matches += 1;
    }

    let sortedByGolesContra = arrayNuevo2.sort(function (a, b) {
      return a.goals - b.goals;
    });
    
  }
}

  let tblBody = document.getElementById("perdedores_body");
  for (let i = 0; i < 5; i++) {
    let tr = document.createElement("tr");

    let club = document.createElement("td");
    club.innerText = arrayNuevo2[i].name;

    let tdPartidos = document.createElement("td");
    tdPartidos.innerText = arrayNuevo2[i].matches;

    let tdGolesE = document.createElement("td");
    tdGolesE.innerText = arrayNuevo2[i].goals;

    tr.append(club);
    tr.append(tdGolesE);
    tr.append(tdPartidos);
    tblBody.append(tr);
  }

  
}


function getFetch(){
  const url = "http://api.football-data.org/v2/competitions/2014/matches";
  fetch(url,{
      method: "GET",
      headers: {
          "X-Auth-Token": "3c3cf5121aca408783e167b985e62751"
      }
  }).then(response =>{
      if(response.ok) return response.json();
  }).then(data=>{
      let tablaFetch = data.matches;

  topMejores(tablaFetch);
  getStats2(tablaFetch);
  })
  
}
getFetch()