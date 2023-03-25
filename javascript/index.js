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
console.log(eventosFuturos)
console.log(eventosPasados)

// capturando el id de la seccion a la que se hace click en el menu de navegacion
var buttonNav = document.getElementsByClassName("enlaceNav")
console.log(buttonNav)

for (var i = 0; i < buttonNav.length; i++) {
    const elementos = buttonNav[i];


    elementos.addEventListener("click", function (e) {
        navegacion(e.target.id);
    })

}





// agregando la clase active



// esta funcion evalua a que seccion corresponde el id capturado
function navegacion(id) {

    switch (id) {
        case "upcoming":
            buttonNav[0].classList.remove('active'),
            buttonNav[1].classList.add('active'),
            buttonNav[2].classList.remove('active'),
           document.getElementById("tiempo").innerHTML="Upcoming Events",
           document.getElementById("secNavDos").classList.add('navUpcoming'),
            display(eventosFuturos)
            break;

        case "past":
            buttonNav[0].classList.remove('active'),
            buttonNav[1].classList.remove('active'),
            buttonNav[2].classList.add('active'),
            document.getElementById("tiempo").innerHTML="Past Events",
            document.getElementById("secNavDos").classList.add('navPast'),
            display(eventosPasados)
            break;

        default:
            buttonNav[0].classList.add('active'),
            buttonNav[1].classList.remove('active'),
            buttonNav[2].classList.remove('active'),
            document.getElementById("tiempo").innerHTML="Home",
            document.getElementById("secNavDos").classList.add('navHome'),
            display(eventos)
    }

}


// esta funcion genera el template para la seccion seleccionada

// += permite ir sumando elementos en el html a medida que se recorre el array
function display(array) {

    var html = "";
    for (var i = 0; i < array.length; i++) {
        html += `
    <div class="col">
        <div class="card h-100">
          <img src="./multimedia/Images/${array[i].image}" class="card-img-top" alt="foto ${array[i].name}">
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
navegacion("home")