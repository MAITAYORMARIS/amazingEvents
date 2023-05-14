let eventos = []
let eventosPasados = []
let eventosFuturos = []

// let categorias=[]
var buttonNav = document.getElementsByClassName("nav-link")

function botonesNavStats() {
    buttonNav[0].classList.remove("active"),
        buttonNav[1].classList.remove("active"),
        buttonNav[2].classList.remove("active"),
        buttonNav[3].classList.remove("active"),
        buttonNav[4].classList.add("active"),
        document.getElementById("tituloCarousel").innerHTML = "Stats"
}

async function getDataStats() {
    let dataApi;
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => dataApi = json)
    console.log(dataApi)
    fechaBase = dataApi.fechaActual
    eventos = dataApi.eventos

    eventos.filter(evento => {
        if (evento.assistance) { eventosPasados.push(evento) }
        else { eventosFuturos.push(evento) }
    })

    construyeStats()
    botonesNavStats()
} getDataStats()

async function construyeStats() {

    var categorias = []
    var categoriasUnicas = eventos.map(evento => evento.category)
    const categoriasLimpias = new Set(categoriasUnicas)

    categorias = [...categoriasLimpias]

    var grupoCategorias = []

    categorias.forEach(categoria => {
        grupoCategorias.push(
            {
                categoria: categoria,
                data: eventos.filter(evento => evento.category === categoria),
            }
        )
    })
    console.log(grupoCategorias)
    var ingresosyAsistencia = []

    grupoCategorias.map(datos => {
        ingresosyAsistencia.push({
            categoria: datos.categoria,
            ingresosPorItem: datos.data.map(item => item.assistance ? item.assistance * item.price : 0),
            ingresosEstimadosItem: datos.data.map(item => item.estimate ? item.estimate * item.price : 0),
            asistenciaPorItem: datos.data.map(item => item.assistance ? item.assistance : 0),
            asistenciaEstItem: datos.data.map(item => item.estimate ? item.estimate : 0),
            capacidad: datos.data.map(item => item.capacity ? item.capacity : 0)
        })
    })


    console.log(ingresosyAsistencia)

    ingresosyAsistencia.forEach(categoria => {
        let totalAsistencia = 0
        let asistenciaTotalEstimada = 0
        let totalCapacidadPasados = 0
        let totalCapacidadFuturos = 0

        for (var i = 0; i < categoria.ingresosPorItem.length; i++) {
            if (categoria.ingresosPorItem[i] > 0) {
                totalCapacidadPasados += categoria.capacidad[i]
                totalAsistencia += categoria.asistenciaPorItem[i]
                categoria.totalCapacidadPasados = totalCapacidadPasados
                categoria.totalAsistencia = totalAsistencia
            }
            else {
                totalCapacidadFuturos += categoria.capacidad[i]
                asistenciaTotalEstimada += categoria.asistenciaEstItem[i]
                categoria.totalCapacidadFuturos = totalCapacidadFuturos
                categoria.asistenciaTotalEstimada = asistenciaTotalEstimada
            }
        }
        categoria.porcentajeAsistencia = ((totalAsistencia * 100) / totalCapacidadPasados).toFixed(2) + "%"
        categoria.porcentajeAsistEstimada = ((asistenciaTotalEstimada * 100) / totalCapacidadFuturos).toFixed(2) + "%"

        let ingresosTotales = 0
        categoria.ingresosPorItem.map(ingresos => ingresosTotales += ingresos)
        categoria.ingresosTotal = ingresosTotales

        let ingresosEstimados = 0
        categoria.ingresosEstimadosItem.map(ingresosEst => ingresosEstimados += ingresosEst)
        categoria.ingresosEstimados = ingresosEstimados
    })


    console.log(ingresosyAsistencia)

    eventosPasados.map(evento => {
        evento.porcentajeAsistencia = (evento.assistance * 100 / evento.capacity).toFixed(2)
    })
    console.log(eventosPasados)

    let asistenciaAEventos = []
    eventosPasados.filter(evento => { asistenciaAEventos.push(evento.porcentajeAsistencia) })
    let mayor = Math.max(...asistenciaAEventos)
    console.log(mayor)

    let eventoMayorAsist = eventosPasados.filter(evento => evento.porcentajeAsistencia == mayor)
    console.log(eventoMayorAsist)

    let menor = Math.min(...asistenciaAEventos)
    console.log(menor)
    let eventoMenorAsist = eventosPasados.filter(evento => evento.porcentajeAsistencia == menor)
    console.log(eventoMenorAsist)

    let mayorCapacidad = eventos.sort((a, b) => { return b.capacity - a.capacity })
    console.log(mayorCapacidad)

    // creando elementos de la tabla eventos mayores y menores valores
    var tdMayorAsistencia = document.createElement("td")
    var tdMenorasistencia = document.createElement("td")
    var tdMayorCapacidad = document.createElement("td")
    // var rowmaxmin = document.getElementById("maxmin")
    var tableMaxMin = document.getElementById("statsMaxMin")
    var rowmaxmin = document.createElement("tr")
    tableMaxMin.append(rowmaxmin)


    rowmaxmin.append(tdMayorAsistencia)
    tdMayorAsistencia.append(eventoMayorAsist[0].name + " " + eventoMayorAsist[0].porcentajeAsistencia + "%")

    rowmaxmin.append(tdMenorasistencia)
    tdMenorasistencia.append(eventoMenorAsist[0].name + " " + eventoMenorAsist[0].porcentajeAsistencia + "%")

    rowmaxmin.append(tdMayorCapacidad)
    tdMayorCapacidad.append(mayorCapacidad[0].name)

    // creando elementos de estadisticas de futuros
    var tablafuturos = document.getElementById("statsFuturos")
    var tablaPasados = document.getElementById("statsPasados")

    let InfoToStatsFuturos = []
    InfoToStatsFuturos = ingresosyAsistencia.sort((a, b) => {
        return b.ingresosEstimados - a.ingresosEstimados
    })
    InfoToStatsFuturos.map(categoria => {
        if (categoria.ingresosEstimados) {
            tablafuturos.innerHTML +=
                ` <tr>
 <td>${categoria.categoria}</td>
 <td>${categoria.ingresosEstimados}</td>
 <td>${categoria.porcentajeAsistEstimada}</td>
</tr>

 `
        }
    })

    let InfoToStatsPasados = []
    InfoToStatsPasados = ingresosyAsistencia.sort((a, b) => {
        return b.ingresosTotal - a.ingresosTotal
    })
    InfoToStatsPasados.map(categoria => {
        if (categoria.ingresosTotal) {
            tablaPasados.innerHTML +=
                ` <tr>
 <td>${categoria.categoria}</td>
 <td>${categoria.ingresosTotal}</td>
 <td>${categoria.porcentajeAsistencia}</td>
</tr>
 `
        }
    })

}




