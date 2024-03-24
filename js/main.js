// main.js


//*
// Codigo para la funcionalidad del carrousel en dispositivo movil 

window.addEventListener('resize', function () {
  var width = window.innerWidth;
  var carouselInner = document.querySelector('.carousel-inner.service');
  var cards = Array.from(document.querySelectorAll('.card.service'));

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
});

// Ejecuta la función de redimensionamiento al cargar la página
window.dispatchEvent(new Event('resize'));


/**
 * Animación Scroll 
 */

// Selecciona todos los elementos que necesitan la animación
const elementos = document.querySelectorAll('img, button, p, h2, h3, h4, h5, h6, li, input');

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



/*
/*
/*
/**
 * 
 * @param {otras funciones por verificar} target 
 */

// Función para manejar el desplazamiento suave al hacer clic en los enlaces de la barra de navegación
function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: 'smooth'
  });
}

// Evento para manejar el clic en los enlaces de la barra de navegación
document.querySelectorAll('.navbar-nav a').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target.getAttribute('href');
    smoothScroll(target);
  });
});

// Función para mostrar animaciones al desplazarse
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementPosition < windowHeight) {
      element.classList.add('animate');
    }
  });
}

// Evento para manejar el desplazamiento de la página
window.addEventListener('scroll', animateOnScroll);

// Función para manejar el clic en los iconos de las categorías de servicios
function handleCategoryClick(category) {
  const target = `#${category}`;
  smoothScroll(target);
}

// Evento para manejar el clic en los iconos de las categorías de servicios
document.querySelectorAll('.category-icon').forEach(icon => {
  icon.addEventListener('click', (event) => {
    const category = event.target.getAttribute('data-category');
    handleCategoryClick(category);
  });
});

// Función para inicializar el carrusel de productos y servicios
function initCarousel() {
  const carousel = new bootstrap.Carousel(document.querySelector('.carousel'), {
    interval: 5000
  });
}

// Evento para inicializar el carrusel de productos y servicios cuando la página se carga completamente
window.addEventListener('load', initCarousel);

// Función para manejar el clic en los íconos de las redes sociales
function handleSocialMediaClick(socialMedia) {
  // Lógica para redirigir al usuario a la página de la red social correspondiente
}

// Evento para manejar el clic en los íconos de las redes sociales
document.querySelectorAll('.social-media-icon').forEach(icon => {
  icon.addEventListener('click', (event) => {
    const socialMedia = event.target.getAttribute('data-social-media');
    handleSocialMediaClick(socialMedia);
  });
});