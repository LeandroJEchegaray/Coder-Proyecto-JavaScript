let carrito=[];

let contador=0;
let lentes_hombre={nombre:"Lentes de sol unisex", marca:"Rusty", color:"Negro", de_sol:true, stock:2, cant:0, id:0, en_carrito:false};
let lentes_mujer={nombre:"Lentes", marca:"Ray-Ban", color:"Blanco", de_sol:false, stock:19, cant:0, id:1, en_carrito:false};
let lentes_kids={nombre:"Lentes para niño", marca:"Miraflex", color:"Rosado", de_sol:true, stock:10, cant:0, id:2, en_carrito:false};
let id;
let op;

function agregar_al_carrito(elemento) {

    if (elemento.cant==0) {
        carrito.push(elemento);
        elemento.en_carrito==true;
    }

    if (elemento.cant >= elemento.stock) {
        console.log("No hay suficiente stock");
    } else {
        elemento.cant++;
        contador++;
    }
    
}
function eliminar_del_carrito() {
    let index;
    id=parseInt(prompt("Elige el elemento que deseas eliminar (ID): "));

    for (const producto of carrito) {

        if (id == producto.id ) {

            index = carrito.indexOf(producto);
            console.log(index);
            
            if ((index+1)==carrito.length) {
                carrito.pop();
            } else if (index==0) {
                carrito.shift();
            } else {
                carrito.splice(index,index);
            }

            console.log("Eliminaste " + producto.nombre + " con la ID: " + producto.id);
            contador= contador - producto.cant;
            producto.cant=0;
        }
    }
}
function mostrar_carrito() {

    console.log("Agregaste " + contador + " articulos al carrito")
            
    if (contador==0) {
        console.log("¡Esta vacio!")
    } else {
        console.log("En el carrito hay: ")
    }

    for (const producto of carrito) {
        
        if (producto.de_sol == true) {
            console.log("ID:" + producto.id + " Cantidad: " + producto.cant + " Item: " + producto.nombre + " Marca: " + producto.marca + " Color:" + producto.color + " con filtro UV: si" );
        } else {
            console.log("ID:" + producto.id + " Cantidad: " + producto.cant + " Item: " + producto.nombre + " Marca: " + producto.marca + " Color:" + producto.color + " con filtro UV: no")
        }
    }
}
do {
    op=prompt("1. Agregar lentes de sol marca rusty" + " stock: " + lentes_hombre.stock + " en carrito: " + lentes_hombre.cant + "\n2. Agregar lentes con receta marca ray-ban"  + " stock: " + lentes_mujer.stock + " en carrito: " + lentes_mujer.cant + "\n3. Agregar lentes de sol para niño marca miraflex"  + " stock: " + lentes_kids.stock + " en carrito: " + lentes_kids.cant + "\n4. Eliminar del carrito\n9. Ver carrito\n0. Salir");
    switch (op) {
        case "9":
            mostrar_carrito();
            break;
    
        case "1":
            console.log("Agregando lentes de sol hombre marca rusty");
            agregar_al_carrito(lentes_hombre)
            break;
    
        case "2":
            console.log("Agregando lentes con receta de mujer marca ray-ban");
            agregar_al_carrito(lentes_mujer)
            break;
    
        case "3":
            console.log("Agregando lentes de sol para niño marca miraflex");
            agregar_al_carrito(lentes_kids);
            break;
        case "4":
            mostrar_carrito();
            eliminar_del_carrito();
            break;

        case "0":
            console.log("Saliendo de la tienda.");
            break

        default:
            alert("No ingresaste una opción válida. ¡Vuelve a intentarlo!");
            break;
    }

} while (op!="0");



