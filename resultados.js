let data = matches;
let partidos = data.matches;

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
      let partidos = data.matches;

      genera_tabla(partidos);  

      crearListener(partidos);

  })
  
}
getFetch()


function genera_tabla(partidos) {
  let tblBody = document.getElementById("partidos_body");
  vaciar();
  for (let i = 0; i < partidos.length; i++) {
    let hilera = document.createElement("tr");

    let celda = document.createElement("td");
    let textoCelda = document.createTextNode(partidos[i].homeTeam.name);

    let celdaEsqudo = document.createElement("td");
    let imageAway = document.createElement("img");
    let imageHome = document.createElement("img");
    imageAway.setAttribute(
      "src",
      `https://crests.football-data.org/${partidos[i].awayTeam.id}.svg`
    );
    imageAway.setAttribute("alt", "escudo equipo");
    imageHome.setAttribute(
      "src",
      `https://crests.football-data.org/${partidos[i].homeTeam.id}.svg`
    );
    imageHome.setAttribute("alt", "escudo equipo");
    imageAway.width = 40;
    imageHome.width = 40;

    let celda1 = document.createElement("td");
    let textoCelda1;
    if (partidos[i].score.fullTime.homeTeam == null) {
      textoCelda1 = document.createTextNode("Próximamente");
    } else {
      textoCelda1 = document.createTextNode(
        partidos[i].score.fullTime.homeTeam +
          " - " +
          partidos[i].score.fullTime.awayTeam
      );
    }

    let celda2 = document.createElement("td");
    let textoCelda2 = document.createTextNode(partidos[i].awayTeam.name);

    celda.classList.add("local");
    celda1.classList.add("resultado");
    celda2.classList.add("visitante");

    celda.appendChild(textoCelda);
    celda.appendChild(imageHome);
    celda1.appendChild(textoCelda1);
    celda2.appendChild(imageAway);
    celda2.appendChild(textoCelda2);

    hilera.appendChild(celda);
    hilera.appendChild(celda1);
    hilera.appendChild(celda2);

    tblBody.appendChild(hilera);
  }
}
genera_tabla(partidos);



function filtrarPorNombre(partidos) {
  let nombre = document.querySelector("input").value;

  let equipoNombre = partidos.filter((e) => {
    if (e.homeTeam.name.toLowerCase().includes(nombre.toLocaleLowerCase()) || e.awayTeam.name.toLowerCase().includes(nombre.toLocaleLowerCase())) {
      return true;
    }
    return false;
  });

  genera_tabla(equipoNombre);
}

filtrarPorNombre(partidos);

function vaciar() {
  document.getElementById("partidos_body").innerHTML = "";
}

function filtrarEmpates(partidos) {
  let resultados = document.querySelector("input").value;
  let empates = partidos.filter((e) => {
    if (e.score.winner == "DRAW") {
      return true;
    }
    return false;
  });
  filtrarPorNombre(empates)
}


function filtrarProximo(partidos) {
  let resultados = document.querySelector("input").value;
  let proximos = partidos.filter((e) => {
    if (e.score.fullTime.homeTeam == null && e.score.fullTime.awayTeam == null) {
      return true;
    }
    return false;
  });
  filtrarPorNombre(proximos)
}



function filtrarGanados(partidos) {
  let resultado = document.querySelector("input").value;
  let ganados = partidos.filter((e) => {

    if(e.homeTeam.name.toLowerCase().includes(resultado) && e.score.winner === "HOME_TEAM"){
      return true
    }

    else if(e.awayTeam.name.toLowerCase().includes(resultado) && e.score.winner === "AWAY_TEAM" ){
      return true
    }

    else if (e.score.winner === null) {
      return false;
    }

    else if (e.score.winner === "DRAW") {
      return false;
    }
    else
      return false;
  })

  filtrarPorNombre(ganados);
}


function filtrarPerdidos(partidos) {
  let resultado = document.querySelector("input").value;
  let ganados = partidos.filter((e) => {

    if(e.homeTeam.name.toLowerCase().includes(resultado) && e.score.winner === "AWAY_TEAM"){
      return true
    }

    else if(e.awayTeam.name.toLowerCase().includes(resultado) && e.score.winner === "HOME_TEAM" ){
      return true
    }

    else if (e.score.winner === null) {
      return false;
    }

    else if (e.score.winner === "DRAW") {
      return false;
    }
    else
      return false;
  })


  filtrarPorNombre(ganados);
}

 function crearListener(partidos) {
  let boton = document.getElementById("boton");
  boton.addEventListener("click", () => {
    filtrarPorNombre(partidos)
  })

  let ganados = document.getElementById("ganado");
  ganados.addEventListener("click", () => {
    filtrarGanados(partidos);
  })

  let perdidos = document.getElementById("perdido");
  perdidos.addEventListener("click", () => {
    filtrarPerdidos(partidos);
  })

  let empatados = document.getElementById("empatado");
  empatados.addEventListener("click", () => {
    filtrarEmpates(partidos);
  })

  let proximos = document.getElementById("proximo");
  proximos.addEventListener("click", () => {
    filtrarProximo(partidos);
  })
}
 





 let op = setInterval(incNum, 20);
function incNum(){
  let text = document.getElementById("text");
  let line = document.getElementById("line");

  let a = window.getComputedStyle(line, ":before").getPropertyValue("width");
  a = Math.floor((parseInt(a) / 10) * 2);
  if(a == 100){
    clearInterval(op);
  }
} 