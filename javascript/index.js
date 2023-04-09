// console.log(dataAmazing)

var fechaBase = dataAmazing.fechaActual
console.log(fechaBase)
var eventos = dataAmazing.eventos
console.log(eventos)

var eventosPasados = []
var eventosFuturos = []

for (var i = 0; i < eventos.length; i++) {
    if (eventos[i].date > fechaBase) {
        eventosFuturos.push(eventos[i])
    }
    else {
        eventosPasados.push(eventos[i])
    }
}

// capturando el id de la seccion a la que se hace click en el menu de navegacion
var buttonNav = document.getElementsByClassName("nav-link")
console.log(buttonNav)

for (var i = 0; i < buttonNav.length; i++) {
    const elementos = buttonNav[i];

    elementos.addEventListener("click", function (e) {
        navegacion(e.target.id);
    })

}

// esta funcion evalua a que seccion corresponde el id capturado
function navegacion(id) {
    switch (id) {
        case "upcoming":

            buttonNav[0].classList.remove("active"),
                buttonNav[1].classList.add("active"),
                buttonNav[2].classList.remove("active"),
                buttonNav[3].classList.remove("active"),
                buttonNav[4].classList.remove("active"),
                document.getElementById("tiempo").innerHTML = "Upcoming Events",
                document.getElementById("secNavDos").classList.add('navUpcoming'),
                // document.getElementById("secNavDos").classList.remove('navPast'),
                display(eventosFuturos),
                console.log("con funcion navegacion estoy en futuros")
            break;

        case "past":
            buttonNav[0].classList.remove("active"),
                buttonNav[1].classList.remove("active"),
                buttonNav[2].classList.add("active"),
                buttonNav[3].classList.remove("active"),
                buttonNav[4].classList.remove("active"),
                document.getElementById("tiempo").innerHTML = "Past Events",
                document.getElementById("secNavDos").classList.add('navPast'),
                // document.getElementById("secNavDos").classList.remove('navUpcoming'),
                display(eventosPasados)
            console.log("con funcion navegacion estoy en pasados")
            break;

        case "contact":
            buttonNav[0].classList.remove("active"),
                buttonNav[1].classList.remove("active"),
                buttonNav[2].classList.remove("active"),
                buttonNav[3].classList.add("active"),
                buttonNav[4].classList.remove("active"),
                // document.getElementById("secNavDos").classList.remove('navUpcoming'),
                // document.getElementById("secNavDos").classList.remove('navPast'),
                console.log("con funcion navegacion estoy en contacto")
            break;

        case "stats":
            buttonNav[0].classList.remove("active"),
                buttonNav[1].classList.remove("active"),
                buttonNav[2].classList.remove("active"),
                buttonNav[3].classList.remove("active"),
                buttonNav[4].classList.add("active"),
                // document.getElementById("secNavDos").classList.remove('navUpcoming'),
                // document.getElementById("secNavDos").classList.remove('navPast'),
                console.log("con funcion navegacion estoy en stats")
            break;

        default:
            buttonNav[0].classList.add("active"),
                buttonNav[1].classList.remove("active"),
                buttonNav[2].classList.remove("active"),
                buttonNav[3].classList.remove("active"),
                buttonNav[4].classList.remove("active"),
                document.getElementById("tiempo").innerHTML = "Home",
                document.getElementById("secNavDos").classList.remove('navUpcoming'),
                document.getElementById("secNavDos").classList.remove('navPast'),
                display(eventos)
            console.log(" con funcion navegacion estoy en home")

    }

}


// // esta funcion genera el template para la seccion seleccionada

// += permite ir sumando elementos en el html a medida que se recorre el array
function display(array) {
    var url;
    var imageUrl;
    if (location.pathname == "/pages/detalle.html") {
        url = "./detalle.html"
        imageUrl = "../multimedia/Images/"
    }
    else {
        url = "./pages/detalle.html"
        imageUrl = "./multimedia/Images/"

    }

    var html = "";
    for (var i = 0; i < array.length; i++) {
        html += `
    <div class="col">
        <div class="card h-100">
          <img src="${imageUrl}${array[i].image}" class="card-img-top" alt="foto ${array[i].name}">
          <div class="card-body">
            <h5 class="card-title">${array[i].name}</h5>
            <p class="card-text">${array[i].description}</p>
          </div>
          <div class="card-footer">
            <small class="badge text-bg-info">Precio: $ ${array[i].price}</small>
            <a href="${url}?id=${array[i].id}" class="btn btn-outline-light">Ver más</a>
          </div>
        </div>
    </div>
        `
    }

    document.getElementById("cartasDeEventos").innerHTML = html;


}
// // navegacion("home") este lo colocamos ahora en un switch para poder navegar desde contacto y estadisticas a pasado, futuro


// // console.log(location.pathname)
console.log(location.search)
var tiempo = location.search.split("?tiempo=")
console.log(tiempo[1])
switch (tiempo[1]) {
    case "upcoming": navegacion("upcoming") //clickFlechaIzq("upcoming")
        break;
    case "past": navegacion("past") //clickFlechaIzq("past")
        break;
    default: navegacion("home")
}
