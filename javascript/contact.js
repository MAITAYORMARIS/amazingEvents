(function() {
   navegacion("contact")
})()



























// // agregando la clase active LINEAS 42  A 111

// // CLASE ACTIVE DE LOS BOTONES
// var botonNav = document.getElementsByClassName("nav-link")
// console.log("estos son los botones que estan en la variable botonNav")
// console.log(botonNav)

// for (var i = 0; i < botonNav.length; i++) {
//     const botones = botonNav[i];


//     botones.addEventListener("click", function (e) {
//         claseBoton(e.target.id);


//     })

// }

// function claseBoton(id) {

//     switch (id) {
//         case "upcoming":
//             botonNav[0].classList.remove('active'),
//                 botonNav[1].classList.add('active'),
//                 botonNav[2].classList.remove('active'),
//                 botonNav[3].classList.remove('active'),
//                 botonNav[4].classList.remove('active'),
                
//                 console.log("estoy en futuros")
//             break;

//         case "past":

//             botonNav[0].classList.remove('active'),
//                 botonNav[1].classList.remove('active'),
//                 botonNav[2].classList.add('active'),
//                 botonNav[3].classList.remove('active'),
//                 botonNav[4].classList.remove('active'),
                
//             console.log("estoy en pasados")
//             break;

//         case "contact":

//             botonNav[0].classList.remove('active'),
//                 botonNav[1].classList.remove('active'),
//                 botonNav[2].classList.remove('active'),
//                 botonNav[3].classList.add('active'),
//                 botonNav[4].classList.remove('active'),
//                 console.log("estoy en contacto")
//             break;
//         case "stats":

//             botonNav[0].classList.remove('active'),
//                 botonNav[1].classList.remove('active'),
//                 botonNav[2].classList.remove('active'),
//                 botonNav[3].classList.remove('active'),
//                 botonNav[4].classList.add('active'),
//                 console.log("estoy en estadisticas")

//             break;

//         default:
//             botonNav[0].classList.toggle('active'),
//                 botonNav[1].classList.remove('active'),
//                 botonNav[2].classList.remove('active'),
//                 botonNav[3].classList.remove('active'),
//                 botonNav[4].classList.remove('active'),  
                  
//                 console.log("estoy en home")

//     }

// }