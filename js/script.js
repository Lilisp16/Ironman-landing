// Productos de ejemplo
const productos = [
    { id: 1, nombre: "Medias 1", precio: 80000, img: "https://terret.co/cdn/shop/files/MediasTobillerasAqua_940x.png?v=1760122790" },
    { id: 2, nombre: "Medias 2", precio: 120000, img: "https://terret.co/cdn/shop/files/MediasTobillerasAqua_940x.png?v=1760122790" },
    { id: 3, nombre: "Medias 3", precio: 150000, img: "https://terret.co/cdn/shop/files/MediasTobillerasAqua_940x.png?v=1760122790" },
    { id: 4, nombre: "Medais 4", precio: 200000, img: "https://terret.co/cdn/shop/files/MediasTobillerasAqua_940x.png?v=1760122790" }
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
