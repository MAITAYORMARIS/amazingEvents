var fechaBase = dataAmazing.fechaActual
console.log(fechaBase)

var eventos = dataAmazing.eventos

console.log(location.search) //busca los datos en la url
var id = location.search.split("?id=").filter(Number)

var selectedId = id[0]
console.log(selectedId)

const detalleEvento = []

for (var i = 0; i < eventos.length; i++) {
    if (eventos[i].id == selectedId) {
        detalleEvento.push(eventos[i])
    }
}

console.log(detalleEvento[0])
console.log(detalleEvento[0].name)

if(detalleEvento[0].date>fechaBase){
    detalleEvento[0].assistance=`Estimado(${detalleEvento[0].estimate})`
    
}
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
                <p class="card-text">${detalleEvento[0].info}</p>
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
    document.getElementById("detallesDeLosEventos").innerHTML=contenido



