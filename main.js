
const carrito = [];


const ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio);
    mostrarListaOrdenada();
}


const ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio);
    mostrarListaOrdenada();
}

const mostrarListaOrdenada = () => {
    const listaOrdenada = productos.map(producto => {
        return '- ' + producto.nombre + ' $' + producto.precio
    });
    alert('Lista de precios:' + '\n\n' + listaOrdenada.join('\n'))
    comprarProductos(listaOrdenada)
}

const comprarProductos = (listaDeProductos) => {
    let otroProducto;
    let productoNombre = '';
    let productoCantidad = 0;

    do {
        productoNombre = prompt('¿Que producto desea comprar?' + '\n\n' + listaDeProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿Cuántos querés comprar?'));

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto no se encuentra en el catálogo.')
        }

        otroProducto = confirm('Desea agregar otro producto?');
    } while (otroProducto)

    confirmarCompra()
};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad;
    }
    console.log(carrito)
}


const confirmarCompra = () => {
    const listaCarrito = carrito.map(producto => {
        return '- ' + producto.nombre + ' | Cantidad: ' + producto.cantidad
    });

    const confirmar = confirm('Checkout: '
        + '\n\n' + listaCarrito.join('\n')
        + '\n\nPara continuar presione "Aceptar" sino "Cancelar", para cancelar la compra .'
    )

    if (confirmar) {
        finalizarCompra(listaCarrito)
    } else {
        agregarAlCarrito
    }
};


const finalizarCompra = (listaCarrito) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    alert('Detalle de su compra:'
        + '\n\n' + listaCarrito.join('\n')
        + '\n\nTotal de productos: ' + cantidadTotal
        + '\n\nEl total de su compra es: ' + precioTotal
    )
    
};

let precioTotal = 0

const metodoDePago = (precioTotal) => {
    let metodo = prompt("¿Abonaras con tarjeta o efectivo?")
    switch (metodo) {
        case "efectivo":
            alert("La compra la abonarás en efectivo!")
            break
        case "tarjeta":
            let pagoEnCuotas = confirm("¿Deseas pagarla en 3 cuotas?")
            if (pagoEnCuotas == true) {
                let cuotas = (precioTotal / 3).toFixed(2)
                alert("La cuotas son de $" + cuotas)
                break
            }
            else { precioTotal }
            break
    }
}
const mostrarTicketDeCompra = (precioTotal) => {
    alert('El total a pagar es de  $' + precioTotal + '. Gracias por su compra!')
};

const enviarFacturaDeCompra = () => {
    let userEmail = ""
    let confirmUserEmail = ""
    let askAgain = true

    do {
        userEmail = prompt("Ingrese su correo electronico!")
        confirmUserEmail = prompt("Confirme su correo electronico!")

        if (userEmail == confirmUserEmail) {
            alert("El correo " + userEmail + " ha sido registrado con exito! Te mandaremos la factura de compra!")
            askAgain = false
        } else {
            alert("Los correos no coinciden!")
        }
    } while (askAgain)
}



const comprar = () => {
    const productosBaratos = confirm('¿Querés ordenar los productos del más barato al mas caro?')

    if (productosBaratos) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};

comprar()

metodoDePago(precioTotal)

mostrarTicketDeCompra(precioTotal)

enviarFacturaDeCompra(precioTotal)
