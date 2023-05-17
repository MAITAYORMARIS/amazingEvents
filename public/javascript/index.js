let fechaBase
let eventos = []
var eventosPasados = []
var eventosFuturos = []
let arrayBusqueda = []
let selectedBox = []
let datosInput = ""
var inputSearch = document.getElementById("search")

async function getData() {
    let dataApi;
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => dataApi = json)

    fechaBase = dataApi.fechaActual
    eventos = dataApi.eventos
    for (var i = 0; i < eventos.length; i++) {
        if (eventos[i].date > fechaBase) {
            eventosFuturos.push(eventos[i])
        }
        else {
            eventosPasados.push(eventos[i])
        }
    }
   
rutas()
}   getData()

// capturando el id de la seccion a la que se hace click en la barra de navegacion
var buttonNav = document.getElementsByClassName("nav-link")
console.log(buttonNav)

for (var i = 0; i < buttonNav.length; i++) {
    const elementos = buttonNav[i];

    elementos.addEventListener("click", function (e) {
        navegacion(e.target.id);
    })
}

// esta funcion evalua a que seccion corresponde el id capturado para generar el template
function navegacion(id) {
    
    switch (id) {
        case "upcoming":
            buttonNav[0].classList.remove("active"),
                buttonNav[1].classList.add("active"),
                buttonNav[2].classList.remove("active"),
                buttonNav[3].classList.remove("active"),
                buttonNav[4].classList.remove("active"),
                document.getElementById("tituloCarousel").innerHTML = "Upcoming Events",
                document.getElementById("secNavDos").classList.add('navUpcoming'),
                document.getElementById("secNavDos").classList.remove('navPast'),
                console.log("con funcion navegacion estoy en futuros"),
                console.log(eventosFuturos),
                display(eventosFuturos),
                inputSearch.value = "",
                selectedBox = [],
                creaCategorias(eventosFuturos),
                arrayBusqueda = eventosFuturos           
            break;

        case "past":
            buttonNav[0].classList.remove("active"),
                buttonNav[1].classList.remove("active"),
                buttonNav[2].classList.add("active"),
                buttonNav[3].classList.remove("active"),
                buttonNav[4].classList.remove("active"),
                document.getElementById("tituloCarousel").innerHTML = "Past Events",
                document.getElementById("secNavDos").classList.add('navPast'),
                document.getElementById("secNavDos").classList.remove('navUpcoming'),
                console.log("con funcion navegacion estoy en pasados"),
                console.log(eventosPasados),
                display(eventosPasados),
                inputSearch.value = "",
                selectedBox = [],
                arrayBusqueda = eventosPasados,
                creaCategorias(eventosPasados)   
            break;

        default:
            buttonNav[0].classList.add("active"),
                buttonNav[1].classList.remove("active"),
                buttonNav[2].classList.remove("active"),
                buttonNav[3].classList.remove("active"),
                buttonNav[4].classList.remove("active"),
                document.getElementById("tituloCarousel").innerHTML = "Home",
                document.getElementById("secNavDos").classList.remove('navUpcoming'),
                document.getElementById("secNavDos").classList.remove('navPast'),
                console.log(" con funcion navegacion estoy en home"),
                console.log(eventos),
                display(eventos),
                inputSearch.value = "",
                selectedBox = [],
                arrayBusqueda = eventos,
                creaCategorias(eventos)
    }
}


// // function display genera el template para la seccion seleccionada
// += permite ir sumando elementos en el html a medida que se recorre el array
function display(array) {

    var html = "";
    for (var i = 0; i < array.length; i++) {
        html += `
    <div class="col">
        <div class="card h-100">
          <img src="${array[i].image}" class="card-img-top" alt="foto ${array[i].name}">
          <div class="card-body">
            <h5 class="card-title">${array[i].name}</h5>
            <p class="card-text">${array[i].description}</p>
          </div>
          <div class="card-footer">
            <small class="badge text-bg-info">Precio: $ ${array[i].price}</small>
            <a href="./pages/detalle.html?id=${array[i].id}" class="btn btn-outline-light">Ver más</a>
          </div>
        </div>
    </div>
        `
    }

    document.getElementById("cartasDeEventos").innerHTML = html;
}

// navegacion entre upcoming/past/home(detalles)
console.log(location.search)
var tiempo = location.search.split("?tiempo=")
console.log(tiempo[1])

function rutas(){
    var tiempo = location.search.split("?tiempo=")
console.log(tiempo[1])
    switch (tiempo[1]) {
        case "upcoming": 
        console.log("entre en futuros con switch tiempo"),
        navegacion("upcoming") 
            break;
        case "past":  console.log("entre en past con switch tiempo"),
        navegacion("past")
            break;
        default:
            console.log("entre en home con switch tiempo"),
            navegacion("home")
    }
}


// SEGUNDA BARRA DE NAVEGACION
// obteniendo la flecha del html
var flechaIzq = document.getElementsByClassName("fa-angle-left")
console.log(flechaIzq)

flechaIzq[0].addEventListener("click", function (e) {
    for (var i = 0; i < buttonNav.length; i++) {
        if (buttonNav[i].className.includes('active')) {
            botonPrev = buttonNav[i].id
            console.log(botonPrev)
        }
    }
    navegacionPrev(botonPrev)
})

function navegacionPrev(id) {
    switch (id) {
        case "contact": navegacion("past")
            break;
        case "past": navegacion("upcoming")
            break;
        case "upcoming": navegacion("home")
            break;
        case "home": homeToStats()
    }
}
function homeToStats() {
    document.getElementById("enlaceIzq").setAttribute("href", "./pages/stats.html")
}

var flechaDer = document.getElementsByClassName("fa-angle-right")
flechaDer[0].addEventListener("click", function (e) {
    for (var i = 0; i < buttonNav.length; i++) {
        if (buttonNav[i].className.includes('active')) {
            botonNext = buttonNav[i].id
            console.log(botonNext)
        }
    }
    navegacionNext(botonNext)

})
function navegacionNext(id) {
    switch (id) {
        case "home": navegacion("upcoming")
            break;
        case "upcoming": navegacion("past")
            break;
        case "past":
            pastToContact()
    }
}
function pastToContact() {
    document.getElementById("enlaceDer").setAttribute("href", "./pages/contact.html")
}

// FILTRO DE BUSQUEDA INPUTSEARCH
inputSearch.addEventListener("keyup", function (evento) {
    datosInput = evento.target.value.trim().toLowerCase()
    filtradoMultiple()
})

// Creando checkbox dinamicos
function creaCategorias(array) {
    let checkboxList = array.map(evento => evento.category)
    let checkboxListUnica = new Set(checkboxList)
    let categoriesList = [...checkboxListUnica]

    let categoriasDeEventos = ""
    categoriesList.map(category =>
        categoriasDeEventos +=
        `
    <div class="form-check">
    <input class="form-check-input" type="checkbox"  id="categoria1" value="${category}">
    <label class="form-check-label" for="categoria1">${category}</label>
    </div>
    `
    )
    document.getElementById("check").innerHTML = categoriasDeEventos
    selectedBoxListener()
}

function selectedBoxListener() {
    var box = document.querySelectorAll('input[type=checkbox')

    for (i = 0; i < box.length; i++) {
        box[i].addEventListener("change", function () {
            selectedBox = []
            for (var i = 0; i < box.length; i++) {
                if (box[i].checked) {
                    console.log(box[i].value)
                    selectedBox.push(box[i].value)
                }
            }
            filtradoMultiple()
        })
    }
}

function filtradoMultiple() {
    var filtroBusqueda = []

    if (datosInput !== "" && selectedBox.length > 0) {

        for (var i = 0; i < selectedBox.length; i++) {
            var eventoCoincidencia = arrayBusqueda.filter(evento => evento.name.toLowerCase().includes(datosInput) &&
                evento.category === selectedBox[i])
            filtroBusqueda.push(...eventoCoincidencia)
        }
    }
    else if (datosInput !== "" && selectedBox.length == 0) {
        filtroBusqueda = arrayBusqueda.filter(evento => evento.name.toLowerCase().includes(datosInput))
    }
    else if (datosInput == "" && selectedBox.length > 0) {
        for (var i = 0; i < selectedBox.length; i++) {
            var eventoCoincidencia = arrayBusqueda.filter(evento => evento.category === selectedBox[i])
            filtroBusqueda.push(...eventoCoincidencia)
        }
    }
    else {
        filtroBusqueda = arrayBusqueda
    }

    filtroBusqueda.length > 0 ?
        display(filtroBusqueda) :
        document.getElementById("cartasDeEventos").innerHTML = `<div class="aviso"><p >No se encontraron resultados. Intenta nuevamente</p></div>`
    console.log(datosInput)
    console.log(selectedBox)
}











