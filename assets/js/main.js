let articulosCarrito = JSON.parse(localStorage.getItem("articulosCarrito")) ?? [];
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaProductos = document.querySelector("#lista-productos");
const listaProductos2 = document.querySelector("#seccion-card");
const total = document.querySelector(".cart-total");
let cartTotal = 0;
const confimarCompraBtn = document.querySelector("#confirmar-compra");

carritoHTML()

function calculateTotal() {
  cartTotal = 0;
  articulosCarrito.forEach((product) => {
    cartTotal = (parseInt(product.precio) * product.cantidad) + cartTotal;
  })
  document.querySelector(".total-carrito").innerText = `$${cartTotal.toFixed(2)}`;
}

const productos = [{
    id: 1,
    title: "Lentes de sol Rusty vulk",
    img: "assets/img/1.webp",
    price: 2400,
    cant: 0,
    stock: 10
  },
  {
    id: 2,
    title: "Lentes de sol Rusty polarizados orange",
    img: "assets/img/2.webp",
    price: 6600,
    cant: 0,
    stock: 10

  },
  {
    id: 3,
    title: "Lentes de sol Rusty vulkan",
    img: "assets/img/3.webp",
    price: 4000,
    cant: 0,
    stock: 10
  },
  {
    id: 4,
    title: "Lentes de sol Rusty k-vulk 001",
    img: "assets/img/4.webp",
    price: 3460,
    cant: 0,
    stock: 10
  },
  {
    id: 5,
    title: "Lentes de sol Rusty Iron ",
    img: "assets/img/5.webp",
    price: 1230,
    cant: 0,
    stock: 10
  },
];
//generar cards carrito
productos.forEach((producto) => {
  document.getElementById("lista-productos").innerHTML += `
  <div class="card">
      <div>
      <img class="img" src="${producto.img}" alt="">
      </div>
      <div>
      <span class="price-tag-symbol">$</span><span class="price-tag">${producto.price}</span>
      </div>
      <span class="free-shipping">Envio gratis</span>
      <p class ="card-title">${producto.title}</p>
      
      <a href="#" class="btn agregar-carrito" id="${producto.id}">Comprar</a>
      </div>`;
});


cargarEventListeners();

function cargarEventListeners() {
  listaProductos.addEventListener("click", agregarProducto);
  listaProductos2.addEventListener("click", agregarProducto);
  carrito.addEventListener("click", eliminarProducto);
  vaciarCarritoBtn.addEventListener("click", () => {

    if (articulosCarrito.length == 0) {
      Swal.fire({
        title: 'El carrito esta vacio',
        text: 'Agrega algunos productos',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      Swal.fire({
        title: 'Carrito vaciado con éxito',
        text: 'Agrega algunos productos',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      articulosCarrito = [];
      localStorage.setItem("articulosCarrito", JSON.stringify(articulosCarrito));
      limpiarHTML();
    }
  });

  confimarCompraBtn.addEventListener("click", () => {
    if (articulosCarrito.length == 0) {
      Swal.fire({
        title: 'El carrito esta vacio',
        text: 'Agrega algunos productos',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#303030',
      })
    } else {

      Swal.fire({
        title: '¿Confirmar compra?',
        text: "Recuerda revisar bien tus datos",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#303030',
        cancelButtonText: 'Seguir comprando',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Gracias por tu compra!'
          )
          articulosCarrito = [];
          localStorage.setItem("articulosCarrito", JSON.stringify(articulosCarrito));
          limpiarHTML();
        }
      })
    }

  });
}

function agregarProducto(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const productoSeleccionado = e.target.parentElement;
    leerDatosProducto(productoSeleccionado);
    Toastify({
      text: "Producto agregado con éxito",
      className: "info",
      style: {
        background: "#303030",
      }
    }).showToast();
  }
}

function eliminarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-producto")) {
    const productoID = e.target.getAttribute("id");

    articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoID);
    localStorage.setItem("articulosCarrito", JSON.stringify(articulosCarrito));

    carritoHTML();
    Toastify({
      text: "Producto eliminado con éxito",
      className: "info",
      style: {
        background: "#303030",
      }
    }).showToast();
  }
}

function leerDatosProducto(producto) {
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector(".card-title").innerText,
    precio: producto.querySelector(".price-tag").innerText,
    id: producto.querySelector("a").getAttribute("id"),
    cantidad: 1,
  };

  const existe = articulosCarrito.some((producto) => producto.id === infoProducto.id);
  if (existe) {
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto; 
      } else {
        return producto;
      }
    });
    articulosCarrito = [...productos];
    localStorage.setItem("articulosCarrito", JSON.stringify(articulosCarrito));
  } else {
    articulosCarrito = [...articulosCarrito, infoProducto];
    localStorage.setItem("articulosCarrito", JSON.stringify(articulosCarrito));

  }
  carritoHTML();
}

function carritoHTML() {

  limpiarHTML();

  articulosCarrito.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
    <a href="" class="borrar-producto" id="${producto.id}">x</a>
    </td>
    <td>${producto.titulo}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.precio}</td>
    `;

    contenedorCarrito.appendChild(row);
    total.textContent = articulosCarrito.length;
  });
}

function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
  total.textContent = articulosCarrito.length;
  calculateTotal();
}

const buscarUnProducto = () => {
  fetch('https://api.mercadolibre.com/sites/MLA/search?q=lentes_rusty')
    .then((response) => response.json())
    .then(informacion => {
      let acumulador = ``;
      informacion.results.forEach((producto) => {
        
        acumulador += `
      <div class="card">
      <div>
      <img class="img" src="${producto.thumbnail}" alt="">
      </div>
      <div>
      <span class="price-tag-symbol">$</span><span class="price-tag">${producto.price}</span>
      </div>
      <span class="free-shipping">Envio gratis</span>
      <p class ="card-title card-title-mod">${producto.title}</p>
      
      <a href="#" class="btn agregar-carrito" id="${producto.id}">Comprar</a>
      </div>`;
        document.getElementById('seccion-card').innerHTML = acumulador;
      })
    })
  cargarEventListeners()
};
buscarUnProducto();

const openModal = document.querySelector('.hero__cta');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

let open = openModal.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('modal--show');
});

let close = closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.remove('modal--show');
});