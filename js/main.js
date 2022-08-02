const carrito = [];

const productos = [
    {
        id:1,
        title:"Titulo 1",
        img: "assets/1.jpg",
        price: 1000,
        cant:0,
        stock:10
    },
    {
        id:2,
        title:"Titulo 2",
        img: "assets/1.jpg",
        price: 1100,
        cant:0,
        stock:10

    },
    {
        id:3,
        title:"Titulo 3",
        img: "assets/1.jpg",
        price: 1200,
        cant:0,
        stock:10
    },
];

productos.forEach((producto) => {
    const id_button = `add-cart${producto.id}` 
    console.log(id_button);
    document.getElementById("card-section").innerHTML += `
    <div class="col mb-5">
        <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top img-item" src="${producto.img}" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${producto.title}</h5>
                    <!-- Product price-->
                    <h5 class="fw-bolder">$${producto.price}</h5>
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><button class="btn btn-outline-dark mt-auto" id="${id_button}">Agregar al carrito</button></div>
            </div>
        </div>
    </div>`;
})

productos.forEach((producto) => {
    const id_button = `add-cart${producto.id}` 
    document.getElementById(id_button).addEventListener('click', () => {
        agregar_al_carrito(producto);
        console.log(producto);
        contar_elementos();
    })
});

function contar_elementos (){
    let cantidad = carrito.length;
    console.log(cantidad);
    let total = document.querySelector(".cart-total");
    total.textContent = cantidad;
    console.log(carrito);
}

function agregar_al_carrito(producto) {
    const idproducto = `idproducto${producto.id}`
    if (producto.cant==0) {
        carrito.push(producto);
        let estado_carrito=document.querySelector(".show-cart")
        let contenedor = document.createElement ("div");

        contenedor.innerHTML = `
        <div class="detalle-producto">
            <img src="${producto.img}" class="detalle-img" alt="">
            <div class="detalle-producto detalle-producto-mod">
                <span>${producto.title}</span>
                <span id="${idproducto}">Cantidad: 1</span>
            </div>
        </div>
        <span class="product-price">$${producto.price}</span>`
        contenedor.className="cart-item";
        estado_carrito.appendChild(contenedor);
        producto.cant++;
    }
    else {
        producto.cant++;
        let cantidad_producto = document.getElementById(idproducto);
        cantidad_producto.textContent = "Cantidad: "+ producto.cant;
    }
}