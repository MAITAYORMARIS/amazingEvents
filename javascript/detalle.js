var fechaBase = dataAmazing.fechaActual
console.log(fechaBase)

var eventos = dataAmazing.eventos

console.log(location.search) //busca los datos en la url
var id = location.search.split("?id=").filter(Number)

var selectedId = id[0]
console.log(selectedId)

var detalleEvento = []

for (var i = 0; i < eventos.length; i++) {
    if (eventos[i].id == selectedId) {
        detalleEvento.push(eventos[i]);
        informacion(selectedId);
    }
}

// console.log(detalleEvento[0])
// console.log(detalleEvento[0].name)

if (detalleEvento[0].date > fechaBase) {
    detalleEvento[0].assistance = `Estimada(${detalleEvento[0].estimate})`
}
// funcion INFORMACION: sirve para agregar una descripcion mas extensa del evento, realiza un push de una propiedad llamada info al array del evento[i], filtrado por el id seleccionado
function informacion(selectedId) {
    switch (selectedId) {
        case "7":
            var info = "Los Vengadores se reúnen de nuevo y juntan sus fuerzas con las de los recién llegados Quicksilver y Bruja Escarlata para luchar contra un robot maquiavélico llamado Ultrón, el cual Tony Stark creó con el fin de defender la paz, pero resultó defectuoso y ahora pretende exterminar a toda la humanidad."
            detalleEvento.push(info)
            break;
        case "6":
            var info = "Esta feria promueve la creación de un espacio de intercambio y de venta de libros a precios accesibles, además de ofrecer charlas de temas variados. Conociendo lo que cuestan los libros nuevos y que quizá no están al alcance de todos, esta propuesta ofrece el trueque como alternativa, además de la compra"
            detalleEvento.push(info)
            break;
        case "5":
            var info = "Correr puede cambiar tu día, tu vida e incluso el mundo. En esta nueva edición tenemos un desafío de 10k. Esta carrera  se da en el marco del Día Mundial de la Lucha contra el Cáncer  permite reunir fondos para continuar con obras y acompañar a todos los pacientes que luchan contra la enfermedad. La vida corre por tus venas, corre o camina por la vida ¡No puedes perderte esta experiencia! "
            detalleEvento.push(info)
            break;
        case "4":
            var info = "Metallica, la legendaria banda liderada por James Hetfield, ha reprogramado su show en Argentina con Greta Van Fleet como banda invitada. La banda se encuentra celebrando el 30 aniversario de The Black Album, uno de sus discos de mayor éxito con una gira por 12 países y 48 conciertos próximos. Después de dos años de espera, finalmente Metallica reconfirma fechas y vuelve a Latinoamérica, tendremos una única fecha de presentación. No te pierdas la oportunidad de ver a tu banda favorita en vivo!"
            detalleEvento.push(info)
            break;
        case "3":
            var info = "La ciudad se viste de miedo, terror y fantasmas para festejar Halloween. Con Disfraces, música y mucha diversión además de la gran oferta de tragos y bebidas, será el premio al mejor disfraz de la noche, por lo que la vestimenta especial será obligatoria. Las puertas se abrirán a partir de la medianoche y ya puedes adquirir tus entradas anticipadas."
            detalleEvento.push(info)
            break;
        case 2:
            var info = "Esta salida propone un recorrido por la historia de la vida en el planeta, con la exhibición de material paleontológico y arqueológico rescatado, en esta visita podrás conocer a los dinosaurios argentinos que habitaron nuestro territorio hace millones de años. La exhibición alberga más de 30 especies  de dinosaurios terrestres y marinos."
            detalleEvento.push(info)
            break;
        default:
            var info = "Más de 50 culturas estarán presentes en la Fiesta de Colectividades. Será una jornada para vivir la multiculturalidad a través de la gastronomía, artesanía, música y danzas típicas de las comunidades extranjeras. Este evento busca alentar el reconocimiento y la apreciación de la diversidad cultural aportada por las colectividades dentro de la identidad de la Ciudad. En los stands podrás degustar una gran variedad de platos típicos y en los puestos artesanales podrás disfrutar de exhibición de vestimentas tradicionales, fotos y videos acerca de la historia de sus comunidades."
            detalleEvento.push(info)
    }

}
console.log(detalleEvento[1])

var contenido
contenido =
    `
    <div class="row g-0">
    <div class="fecha ">
        <p class="col-md-12">Fecha: ${detalleEvento[0].date}</p>
    </div>
   
    <div class="col-md-5">
        <img src="../multimedia/Images/${detalleEvento[0].image}" class="img-fluid" alt="foto de ${detalleEvento[0].name}">
        <section class="datosUno">
            <div class="monto">
                <p class="parrafoUno">Entradas desde: <i class="fa-solid fa-dollar-sign"></i></p>
                <p class="parrafoDos">${detalleEvento[0].price}</p>
            </div>
        </section>
    </div>
    <div class="col-md-7">
        <div class="card-body">
            <h5 class="card-title">${detalleEvento[0].name}</h5>
            <section class="descripcion">
                <p class="card-text" >${detalleEvento[1]}</p>
            </section>
            <section class="datos">
                <p class="card-text"><small class="text-muted">Categoria: ${detalleEvento[0].category}</small></p>
                <p class="card-text"><small class="text-muted">Lugar:${detalleEvento[0].place}</small></p>
                <p class="card-text"><small class="text-muted">Capacidad:${detalleEvento[0].capacity}</small></p>
                <p class="card-text"><small class="text-muted">Asistencia: ${detalleEvento[0].assistance}</small></p>

            </section>
        </div>
    </div>
</div>
    `
console.log(contenido)
document.getElementById("detallesDeLosEventos").innerHTML = contenido


// ENLACE A OTRAS PAGINAS
var buttonNav = document.getElementsByClassName("nav-link")
console.log(buttonNav)

for (var i = 0; i < buttonNav.length; i++) {
    const elementos = buttonNav[i];


    elementos.addEventListener("click", function (e) {

        navegacion(e.target.id);
        var seccion = document.getElementById("secNavDos");
        seccion.style.display = "flex";
        document.getElementById("detallesDeLosEventos").style.display = "none";
        document.getElementById("cartasDeEventos").style.display = "flex";

    })

}



