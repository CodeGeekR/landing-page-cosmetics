// Función para ajustar el carrusel según el tamaño de la ventana
function ajustarCarrusel(selector) {
  var width = window.innerWidth;
  var carouselInner = document.querySelector(selector + ' .carousel-inner.service');
  var cards = Array.from(document.querySelectorAll(selector + ' .card.service'));

  carouselInner.innerHTML = '';

  if (width < 768) {
    // Para dispositivos móviles, agrupa las tarjetas de dos en dos
    for (var i = 0; i < cards.length; i += 2) {
      var carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      if (i === 0) carouselItem.className += ' active';

      var container = document.createElement('div');
      container.className = 'container';

      var row = document.createElement('div');
      row.className = 'row';

      var col1 = document.createElement('div');
      col1.className = 'col-6 col-md-4';
      col1.appendChild(cards[i]);

      var col2 = document.createElement('div');
      col2.className = 'col-6 col-md-4';
      if (cards[i + 1]) col2.appendChild(cards[i + 1]);

      row.appendChild(col1);
      row.appendChild(col2);
      container.appendChild(row);
      carouselItem.appendChild(container);
      carouselInner.appendChild(carouselItem);
    }
  } else {
    // Para pantallas grandes, agrupa las tarjetas de tres en tres
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
}

// Ejecuta la función de ajuste para cada carrusel al cargar la página y al redimensionar la ventana
window.addEventListener('resize', function () {
  ajustarCarrusel('#carouselServiceMaquillaje');
  // Añade aquí los otros carruseles
});

window.dispatchEvent(new Event('resize'));


// //*
// // Codigo para la funcionalidad del carrousel en dispositivo movil 

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
    let serviceTitle = document.querySelector('.title-service').textContent;
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