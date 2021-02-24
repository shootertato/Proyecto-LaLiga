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
      quitarLoader()
      

  })
  
}
getFetch()

/* genera_tabla  crea la tabla con el resultado de todos los partidos*/

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

/* filtrarPorNombre hace un filtro segun lo que escribes en la barra de busqueda */

function filtrarPorNombre(partidos) {
  let nombre = document.querySelector("input").value;

  let equipoNombre = partidos.filter((e) => {
    if (e.homeTeam.name.toLowerCase().includes(nombre.toLocaleLowerCase()) || e.awayTeam.name.toLowerCase().includes(nombre.toLocaleLowerCase())) {
      return true;
    }
    return false;
  });

  if(equipoNombre.length === 0){
    getErrorFiltro();
     }
     else{
       getQuitarErrorFiltro();
     } 
    
  
    genera_tabla(equipoNombre);
  }


filtrarPorNombre(partidos);


/* vaciar hace que la tabla se vacie de contenido para que no se concatene el contenido */

function vaciar() {
  document.getElementById("partidos_body").innerHTML = "";
}

function filtrarEmpates(partidos) {
  let resultados = document.querySelector("input").value;
  let empates = partidos.filter((e) => {
    if(resultados == ""){
      return partidos;
    }
    if(resultados == ""){
      return partidos;
    }
    if (e.score.winner == "DRAW") {
      return true;
    }
    return false;
  });
  filtrarPorNombre(empates)
}

 function quitarLoader(){
  let contenedor = document.getElementById("contenedor_carga");
  contenedor.style.visibility = "hidden";
  contenedor.style.opacity = "0";
}

/* Hace un filtro de los partidos que aun no se han jugado del equipo seleccionado */

function filtrarProximo(partidos) {
  
  let resultados = document.querySelector("input").value;
  let proximos = partidos.filter((e) => {
    if(resultados == ""){
      return partidos;
    }
    if (e.score.fullTime.homeTeam == null && e.score.fullTime.awayTeam == null) {
      return true;
    }
    return false;
  });


  filtrarPorNombre(proximos)
}

/* Hace un filtro de los partidos ganados del equipo seleccionado */

function filtrarGanados(partidos) {
  let equipo = document.querySelector("input").value;
  let ganados = partidos.filter((e) => {

    if(equipo == false){
      return partidos;
    }
    if(e.homeTeam.name.toLowerCase().includes(equipo) && e.score.winner === "HOME_TEAM"){
      return true
    }

    else if(e.awayTeam.name.toLowerCase().includes(equipo) && e.score.winner === "AWAY_TEAM" ){
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

/* Hace un filtro de los partidos perdidos del equipo seleccionado */

function filtrarPerdidos(partidos) {
  
  let equipo = document.querySelector("input").value;
  let perdidos = partidos.filter((e) => {
    if(equipo == ""){
      return partidos;
    }
    if(e.homeTeam.name.toLowerCase().includes(equipo) && e.score.winner === "AWAY_TEAM"){
      return true
    }

    else if(e.awayTeam.name.toLowerCase().includes(equipo) && e.score.winner === "HOME_TEAM" ){
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


  filtrarPorNombre(perdidos);
}

/* Hace un filtro para los arraybutton */

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
  let todos = document.getElementById("todos");
  todos.addEventListener("click", () => {
    filtrarPorNombre(partidos)
  })
}
 
/* Creada para la alerta de filtros. Llamada en función de filtros. */

function getErrorFiltro(){ 
  let alerta = document.querySelector(".alerta");
  alerta.innerHTML= "";
  let texto = document.createElement("p");
  texto.innerText = "Ese equipo no existe"
  texto.classList.add("textoError")
  alerta.append(texto)
  
  }
  
  /* Creada para quitar alerta de filtro.LLamada en función de filtros */

  function getQuitarErrorFiltro (){ 
    let alerta = document.querySelector(".alerta");
    alerta.innerHTML = ""
  }