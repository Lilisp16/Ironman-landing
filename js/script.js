// Productos de ejemplo
const productos = [
    { id: 1, nombre: "Tenis de running para Hombre Kiprun Jogflow 190 -", precio: 80000, img: "https://contents.mediadecathlon.com/p2636505/1cr1/k$1147a55c63c1d0312ff3606c370f968c/tenis-de-running-jogflow-1901-para-hombre-blancoslashazul.jpg?format=auto&f=768x0" },
    { id: 2, nombre: "Canguro para hidratación", precio: 120000, img: "https://contents.mediadecathlon.com/p2002747/1cr1/k$8687b849acafdf8cab3dee35919603ab/cinturon-hidratacion-running-correr.jpg?format=auto&f=768x0" },
    { id: 3, nombre: "Reloj con cronómetro", precio: 150000, img: "https://contents.mediadecathlon.com/p2204004/1cr1/k$ddb934eedcc57be28f038e0b8a1fc990/reloj-cronometro-de-running-w500m-negro.jpg?format=auto&f=768x0" },
    { id: 4, nombre: "Gel energtico", precio: 9000, img: "https://contents.mediadecathlon.com/p2392710/1cr1/k$2b91186449392dc9e619f9e6b70b9fdc/gel-energetico-fresa-banano.jpg?format=auto&f=768x0" }
];
 
// Aquí renderizamos los productos dinámicamente al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("lista-productos");
 
    productos.forEach(prod => {
        // Aquí creamos la columna y la card del producto
        const col = document.createElement("div");
        col.className = "col-md-3 mb-4 animado";
 
        col.innerHTML = `
            <div class="card producto">
                <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p>$${prod.precio}</p>
 
                    <!-- Botón principal -->
                    <button class="btn btn-warning w-100 btn-comprar">
                        <i class="bi bi-cart fs-5"></i> Agregar al carrito
                    </button>
 
                    <!-- Mini card oculta al inicio -->
                    <div class="unidad d-flex justify-content-center align-items-center gap-3 mt-3 d-none">
                        <button class="btn btn-dark btn-sm btn-restar">−</button>
                        <p class="m-0"><span class="cantidad fw-bold">0</span> und.</p>
                        <button class="btn btn-dark btn-sm btn-sumar">+</button>
                    </div>
                </div>
            </div>
        `;
 
        contenedor.appendChild(col);
    });
 
    // Aquí cargamos el carrito desde localStorage y actualizamos el contador
    mostrarCarrito();
    actualizarContador();
});
 
 
// Aquí escuchamos todos los clicks de la página
document.addEventListener("click", e => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
 
    // Aquí detectamos si el click fue en el botón de "Agregar al carrito"
    if (e.target.closest(".btn-comprar")) {
        const boton = e.target.closest(".btn-comprar");
        const card = boton.closest(".card");
        const nombre = card.querySelector(".card-title").textContent;
        const producto = productos.find(p => p.nombre === nombre);
 
        // Aquí nosotros buscamos si el producto ya está en el carrito
        let item = carrito.find(p => p.id === producto.id);
 
        if (item) {
            // Aquí no agregamos de nuevo, solo aumentamos la cantidad en 1
            item.cantidad++;
        } else {
            // Aquí agregamos el producto por primera vez con cantidad 1
            item = { ...producto, cantidad: 1 };
            carrito.push(item);
        }
 
        // Aquí nosotros guardamos el carrito actualizado en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
 
        // Aquí nosotros actualizamos la mini card y mostramos la cantidad correcta
        const unidadDiv = card.querySelector(".unidad");
        unidadDiv.classList.remove("d-none");
        unidadDiv.querySelector(".cantidad").textContent = item.cantidad;
 
        // Aquí nosotros actualizamos el offcanvas y el contador
        mostrarCarrito();
        actualizarContador();
    }
 
    // Aquí nosotros manejamos el botón de sumar dentro de la mini card
    if (e.target.classList.contains("btn-sumar")) {
        const card = e.target.closest(".card");
        const nombre = card.querySelector(".card-title").textContent;
        const item = carrito.find(p => p.nombre === nombre);
        item.cantidad++;
        card.querySelector(".cantidad").textContent = item.cantidad;
 
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        actualizarContador();
    }
 
    // Aquí nosotros manejamos el botón de restar dentro de la mini card
    if (e.target.classList.contains("btn-restar")) {
        const card = e.target.closest(".card");
        const nombre = card.querySelector(".card-title").textContent;
        const itemIndex = carrito.findIndex(p => p.nombre === nombre);
 
        if (itemIndex > -1) {
            carrito[itemIndex].cantidad--;
 
            if (carrito[itemIndex].cantidad <= 0) {
                // Aquí eliminamos el producto del carrito si cantidad llega a cero
                carrito.splice(itemIndex, 1);
                card.querySelector(".unidad").classList.add("d-none");
            } else {
                card.querySelector(".cantidad").textContent = carrito[itemIndex].cantidad;
            }
 
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
            actualizarContador();
        }
    }
 
    // Aquí manejamos el botón de vaciar carrito
    if (e.target.id === "vaciar") {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        actualizarContador();
 
        // Aquí ocultamos todas las mini cards de los productos
        document.querySelectorAll(".unidad").forEach(div => div.classList.add("d-none"));
    }
});
 
 
 
 
 
 
// Aquí nosotros mostramos el carrito en el offcanvas
function mostrarCarrito() {
    const lista = document.getElementById("misCompras");
    const mensajeVacio = document.getElementById("mensaje-vacio"); // aquí capturo el mensaje "Tu carrito está vacío"
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
 
    lista.innerHTML = ""; // limpio el contenido antes de mostrar
 
    if (carrito.length === 0) {
        // aquí nosotros mostramos el mensaje cuando el carrito está vacío
        mensajeVacio.style.display = "block";
    } else {
        // aquí nosotros ocultamos el mensaje porque el carrito tiene al menos 1 producto
        mensajeVacio.style.display = "none";
    }
 
    // agregamos los productos al offcanvas
    carrito.forEach(item => {
        lista.innerHTML += `
            <div class="d-flex justify-content-between mb-2">
                <p class="mb-0">${item.nombre} x ${item.cantidad}</p>
                <p class="mb-0">$${item.precio * item.cantidad}</p>
            </div>
        `;
    });
 
    // actualizamos subtotal
    const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    document.querySelector("#offcanvasRight .fw-bold span").textContent = `$${subtotal}`;
}
 
 
 
 
 
 
 
 
// animamos los productos al hacer scroll
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
 
//  actualizamos el contador de productos en el carrito
function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contadorSpan = document.getElementById("contador");
 
    // Aquí nosotros actualizamos el contador, y si llega a cero, lo ocultamos
    if (contador === 0) {
        contadorSpan.textContent = "";
    } else {
        contadorSpan.textContent = contador;
    }
}

