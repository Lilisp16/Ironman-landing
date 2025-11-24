// Productos de ejemplo
const productos = [
    { id: 1, nombre: "Tenis de running para Hombre Kiprun Jogflow 190 -", precio: 80000, img: "https://contents.mediadecathlon.com/p2636505/1cr1/k$1147a55c63c1d0312ff3606c370f968c/tenis-de-running-jogflow-1901-para-hombre-blancoslashazul.jpg?format=auto&f=768x0" },
    { id: 2, nombre: "Canguro para hidratación", precio: 120000, img: "https://contents.mediadecathlon.com/p2002747/1cr1/k$8687b849acafdf8cab3dee35919603ab/cinturon-hidratacion-running-correr.jpg?format=auto&f=768x0" },
    { id: 3, nombre: "Reloj con cronómetro", precio: 150000, img: "https://contents.mediadecathlon.com/p2204004/1cr1/k$ddb934eedcc57be28f038e0b8a1fc990/reloj-cronometro-de-running-w500m-negro.jpg?format=auto&f=768x0" },
    { id: 4, nombre: "Gel energético", precio: 9000, img: "https://contents.mediadecathlon.com/p2392710/1cr1/k$2b91186449392dc9e619f9e6b70b9fdc/gel-energetico-fresa-banano.jpg?format=auto&f=768x0" }
];

// Renderizar productos
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("lista-productos");

    productos.forEach(prod => {
        contenedor.innerHTML += `
          <div class="col-md-3 mb-4 animado">
            <div class="card producto">
              <img src="${prod.img}" class="card-img-top">
              <div class="card-body text-center">
                <h5 class="card-title">${prod.nombre}</h5>
                <p>$${prod.precio}</p>
                <button class="btn btn-primary" onclick='agregarCarrito(${JSON.stringify(prod)})'>Agregar</button>
              </div>
            </div>
          </div>`;
    });

    animarScroll();
    cargarCarrito();
});

// Agregar al carrito y localStorage
function agregarCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Mostrar carrito en pantalla
function mostrarCarrito() {
    const lista = document.getElementById("lista-carrito");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    lista.innerHTML = "";
    carrito.forEach(item => {
        lista.innerHTML += `<li class="list-group-item">${item.nombre} - $${item.precio}</li>`;
    });
}

function cargarCarrito() { mostrarCarrito(); }

// Animaciones al hacer scroll
function animarScroll() {
    const elementos = document.querySelectorAll('.animado');

    const mostrar = () => {
        elementos.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', mostrar);
    mostrar();
}
