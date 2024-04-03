//*
//* Código para la funcionalidad del carrusel en dispositivo móvil 
//* */

// Primero, seleccionamos todos los carruseles en la página. 
// Usamos 'Array.from' para convertir el NodeList devuelto por 'querySelectorAll' en un array.
var carousels = Array.from(document.querySelectorAll('.carousel-inner.service'));

// Luego, iteramos sobre cada carrusel con 'forEach'.
carousels.forEach(function (carouselInner) {

  // Agregamos un 'event listener' para el evento 'resize' del objeto 'window'.
  // Esto nos permite ejecutar código cada vez que se cambia el tamaño de la ventana.
  window.addEventListener('resize', function () {

    // Obtenemos el ancho de la ventana con 'window.innerWidth'.
    var width = window.innerWidth;

    // Seleccionamos todas las tarjetas dentro del carrusel actual.
    var cards = Array.from(carouselInner.querySelectorAll('.card.service'));

    // Limpiamos el contenido interno del carrusel.
    carouselInner.innerHTML = '';

    // Si el ancho de la ventana es menor a 768px, agrupamos las tarjetas de dos en dos.
    if (width < 768) {

      // Iteramos sobre las tarjetas con un bucle 'for', incrementando 'i' en 2 cada vez.
      for (var i = 0; i < cards.length; i += 2) {

        // Creamos un nuevo elemento 'div' para el ítem del carrusel.
        var carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';

        // Si 'i' es 0, agregamos la clase 'active' al ítem del carrusel.
        if (i === 0) carouselItem.className += ' active';

        // Creamos los elementos 'div' para el contenedor, la fila y las columnas.
        var container = document.createElement('div');
        container.className = 'container';

        var row = document.createElement('div');
        row.className = 'row';

        var col1 = document.createElement('div');
        col1.className = 'col-6 col-md-4';
        col1.appendChild(cards[i]);

        var col2 = document.createElement('div');
        col2.className = 'col-6 col-md-4';

        // Si existe una tarjeta siguiente, la agregamos a la segunda columna.
        if (cards[i + 1]) col2.appendChild(cards[i + 1]);

        // Agregamos las columnas a la fila, la fila al contenedor y el contenedor al ítem del carrusel.
        row.appendChild(col1);
        row.appendChild(col2);
        container.appendChild(row);
        carouselItem.appendChild(container);

        // Finalmente, agregamos el ítem del carrusel al carrusel.
        carouselInner.appendChild(carouselItem);
      }
    } else {
      // Si el ancho de la ventana es 768px o más, agrupamos las tarjetas de tres en tres.
      // El código aquí es similar al anterior, pero con una columna adicional.
      for (var i = 0; i < cards.length; i += 3) {
        var carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        if (i === 0) carouselItem.className += ' active';

        var container = document.createElement('div');
        container.className = 'container';

        var row = document.createElement('div');
        row.className = 'row';

        var col1 = document.createElement('div');
        col1.className = 'col-12 col-md-4';
        col1.appendChild(cards[i]);

        var col2 = document.createElement('div');
        col2.className = 'col-12 col-md-4';
        if (cards[i + 1]) col2.appendChild(cards[i + 1]);

        var col3 = document.createElement('div');
        col3.className = 'col-12 col-md-4';
        if (cards[i + 2]) col3.appendChild(cards[i + 2]);

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        container.appendChild(row);
        carouselItem.appendChild(container);
        carouselInner.appendChild(carouselItem);
      }
    }
  });

  // Finalmente, disparamos el evento 'resize' para que se ejecute la función de redimensionamiento al cargar la página.
  window.dispatchEvent(new Event('resize'));
});



//Codigo para la funcionalidad del carrousel en dispositivo movil 

// window.addEventListener('resize', function () {
//   var width = window.innerWidth;
//   var carouselInner = document.querySelector('.carousel-inner.service');
//   var cards = Array.from(document.querySelectorAll('.card.service'));

//   carouselInner.innerHTML = '';

//   if (width < 768) {
//     // Para dispositivos móviles, agrupa las tarjetas de dos en dos
//     for (var i = 0; i < cards.length; i += 2) {
//       var carouselItem = document.createElement('div');
//       carouselItem.className = 'carousel-item';
//       if (i === 0) carouselItem.className += ' active';

//       var container = document.createElement('div');
//       container.className = 'container';

//       var row = document.createElement('div');
//       row.className = 'row';

//       var col1 = document.createElement('div');
//       col1.className = 'col-6 col-md-4';
//       col1.appendChild(cards[i]);

//       var col2 = document.createElement('div');
//       col2.className = 'col-6 col-md-4';
//       if (cards[i + 1]) col2.appendChild(cards[i + 1]);

//       row.appendChild(col1);
//       row.appendChild(col2);
//       container.appendChild(row);
//       carouselItem.appendChild(container);
//       carouselInner.appendChild(carouselItem);
//     }
//   } else {
//     // Para pantallas grandes, agrupa las tarjetas de tres en tres
//     for (var i = 0; i < cards.length; i += 3) {
//       var carouselItem = document.createElement('div');
//       carouselItem.className = 'carousel-item';
//       if (i === 0) carouselItem.className += ' active';

//       var container = document.createElement('div');
//       container.className = 'container';

//       var row = document.createElement('div');
//       row.className = 'row';

//       var col1 = document.createElement('div');
//       col1.className = 'col-12 col-md-4';
//       col1.appendChild(cards[i]);

//       var col2 = document.createElement('div');
//       col2.className = 'col-12 col-md-4';
//       if (cards[i + 1]) col2.appendChild(cards[i + 1]);

//       var col3 = document.createElement('div');
//       col3.className = 'col-12 col-md-4';
//       if (cards[i + 2]) col3.appendChild(cards[i + 2]);

//       row.appendChild(col1);
//       row.appendChild(col2);
//       row.appendChild(col3);
//       container.appendChild(row);
//       carouselItem.appendChild(container);
//       carouselInner.appendChild(carouselItem);
//     }
//   }
// });

// // Ejecuta la función de redimensionamiento al cargar la página
// window.dispatchEvent(new Event('resize'));


/**
 * Animación Scroll 
 */

// Selecciona todos los elementos que necesitan la animación
const elementos = document.querySelectorAll('img, button, p, h2, h3, h4, h5, h6, li, input, textarea');

// Define la animación para el scroll hacia abajo
const keyframesAbajo = [
  // { opacity: 0, transform: 'scale(0.25)' }, // Estado inicial
  // { opacity: 1, transform: 'scale(1)' } // Estado final
  { opacity: 0, transform: 'translateY(50px)' },
  { opacity: 1, transform: 'translateY(0)' }
];

// Define las opciones de la animación
const opciones = {
  duration: 700, // Duración de la animación en milisegundos
  easing: 'ease-in-out', // Curva de aceleración de la animación
  fill: 'both' // La animación se aplica tanto antes como después de su ejecución
};

// Variable para almacenar la posición del scroll en el eje Y (vertical)
let lastScrollY = window.scrollY;

// Crea un nuevo Intersection Observer
const observer = new IntersectionObserver((entries) => {
  // Itera sobre todas las entradas
  entries.forEach(entry => {
    // Si el elemento está en la ventana de visualización y el usuario está haciendo scroll hacia abajo
    if (entry.isIntersecting && window.scrollY > lastScrollY) {
      // Aplica la animación de scroll hacia abajo al elemento
      entry.target.animate(keyframesAbajo, opciones);
    }
  });

  // Actualiza la posición del scroll
  lastScrollY = window.scrollY;
});

// Observa todos los elementos seleccionados
elementos.forEach(elemento => {
  observer.observe(elemento);
});

//
//*
//* Codigo para la funcionalidad de cerrar menu hamburguesa en dispositivos moviles cuando el usuario hace click en cualquier hipervinculo dentro del menu
document.addEventListener('DOMContentLoaded', function () {
  var dropdownItems = document.querySelectorAll('.navbar-nav .dropdown-item');
  var contactLink = document.querySelector('.navbar-nav .contact-link');

  var linksToCloseMenu = [...dropdownItems];
  if (contactLink) {
    linksToCloseMenu.push(contactLink);
  }

  linksToCloseMenu.forEach(function (link) {
    link.addEventListener('click', function () {
      var navbarCollapse = document.querySelector('.navbar-collapse.show');
      if (navbarCollapse) {
        navbarCollapse.classList.remove('show');
      }
    });
  });

  // Cerrar el menú hamburguesa cuando se hace clic fuera del menú
  document.body.addEventListener('click', function (event) {
    var navbarCollapse = document.querySelector('.navbar-collapse.show');
    if (navbarCollapse && !navbarCollapse.contains(event.target)) {
      // Verificar si la pantalla es de smartphone o tablet
      if (window.matchMedia('(max-width: 992px)').matches) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});


/*
/* Logica para el button-wp dentro de los cards de carousel para que direcione al whatsapp del vendedor
/* obteniendo el titulo del producto, tipo de servicio o producto. 
/**/

// Selecciona todos los botones con la clase 'button-wp'
const buttons = document.querySelectorAll('.button-wp button');

// Itera sobre cada botón
buttons.forEach(button => {
  // Agrega un event listener para el evento 'click'
  button.addEventListener('click', function (e) {
    e.preventDefault();

    // Encuentra el elemento padre más cercano con la clase 'card'
    const card = this.closest('.card');

    // Encuentra el título del servicio y el nombre del producto dentro del elemento padre
    let serviceTitle = card.closest('section').querySelector('.title-service').textContent;
    const productName = card.querySelector('h5 a').textContent;

    // Verifica si el título del servicio termina con 's' o 'S'
    if (/s$/i.test(serviceTitle)) {
      // Si es así, elimina la última letra
      serviceTitle = serviceTitle.slice(0, -1);
    }

    // Crea el mensaje personalizado
    const message = `Hola, estoy interesad@ en el ${serviceTitle}: ${productName}. ¿Me podrías brindar más información?`;

    // Codifica el mensaje para usarlo en una URL
    const encodedMessage = encodeURIComponent(message);

    // Abre WhatsApp con el mensaje personalizado
    window.open(`https://wa.me/+573507520076?text=${encodedMessage}`);
  });
});
//*
//* Codigo para el Modal de las Cards Vinculado al hacer click en la imagen o en el titulo del cards 
// 

// Obtener todas las imágenes de las tarjetas
const cardImages = document.querySelectorAll('.card-img-carousel');

// // Añadir un evento de clic a cada imagen
// cardImages.forEach((img) => {
//   img.addEventListener('click', handleCardClick);
// });

// // Función para manejar el clic en la tarjeta
// function handleCardClick(event) {
//   // Obtener el ID de la tarjeta
//   const cardId = event.target.closest('.card').id;

//   // Obtener los datos del archivo JSON
//   axios.get('data/details-products.json')
//     .then((response) => {
//       // Filtrar los datos para obtener el objeto que coincide con el ID de la tarjeta
//       const cardData = response.data.find((data) => data.id === cardId);

//       // Crear el modal SweetAlert2
//       Swal.fire({
//         title: cardData.title,
//         html: createCarouselHtml(cardData.images, cardData.description),
//         showCancelButton: true,
//         confirmButtonText: 'Cotizar',
//         cancelButtonText: 'Cerrar',
//       });
//     })
//     .catch((error) => {
//       console.error('Error al obtener los datos:', error);
//     });
// }

// Función para crear el HTML del carrusel
function createCarouselHtml(images, description) {
  let html = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">`;

  images.forEach((image, index) => {
    html += `<div class="carousel-item ${index === 0 ? 'active' : ''}">
               <img src="${image}" class="d-block w-100" alt="...">
             </div>`;
  });

  html += `</div>
           <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
             <span class="visually-hidden">Anterior</span>
           </button>
           <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
             <span class="carousel-control-next-icon" aria-hidden="true"></span>
             <span class="visually-hidden">Siguiente</span>
           </button>
           <p>${description}</p>
         </div>`;

  return html;
}

// Inicializa el plugin CounterUp
// Inicializa la animación cuando el elemento #features entra en la vista
$('#features').waypoint(function () {
  $('.timer').each(function () {
    var $this = $(this);
    var countTo = $this.attr('data-count-to');

    // Verifica si el texto es un número
    if ($.isNumeric(countTo)) {
      $({ countNum: $this.text() }).animate({
        countNum: countTo
      },
        {
          duration: 2000,
          easing: 'linear',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum + '+');
          }
        });
    }
  });
}, { offset: '100%', triggerOnce: false });

//*
//* Codigo para que capturar datos del form y enviar mensaje a WhatsApp
//*

// Enviar los datos cuando el usuario oprima el botón con class sendMessage-btn
document.querySelector('.sendMessage-btn').addEventListener('click', function (e) {
  e.preventDefault();
  axios.post('https://www.kaficosmetics.co/api/send', {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    subject: document.querySelector('#subject').value,
    message: document.querySelector('#message').value
  })
    .then(function (response) {
      Swal.fire({
        title: '¡Enviado!',
        text: 'Tu mensaje fue enviado con éxito.',
        icon: 'success',
        iconColor: '#3ADB14',
        customClass: {
          confirmButton: 'btn-alert-contact'
        }
      })
    })
    .catch(function (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al enviar tu mensaje.',
        icon: 'error',
        customClass: {
          confirmButton: 'btn-alert-contact'
        }
      })
    });
});

//<!-- Funcion que activa una nueva pestaña para Icono WhatsApp (Animado) -->
function addChatWp() {
  var botonWhatsApp = document.querySelector(".boton-whatsapp");

  botonWhatsApp.addEventListener("click", function (event) {
    event.preventDefault();
    // Agrega tu mensaje personalizado aquí
    var mensaje = "Hola, estoy interesad@ en sus productos y servicios de belleza. Me podriaría brindar más información sobre: ";
    // Codifica el mensaje para usarlo en una URL
    var mensajeCodificado = encodeURIComponent(mensaje);
    window.open("https://wa.me/+573507520076?text=" + mensajeCodificado, "_blank");
  });
}
window.addEventListener("load", addChatWp);