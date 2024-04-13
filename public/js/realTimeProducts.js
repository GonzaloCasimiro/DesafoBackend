const socket = io();

const productList = document.getElementById('list-products');
socket.on("listaDeProductos",listaDeProductos=>{
    console.log("CLIENTE CONECTADO")
    productList.innerHTML = '';

    // Iterar sobre la lista de productos y renderizar cada producto
    listaDeProductos.forEach(producto => {
        const nuevoProductoDiv = document.createElement('div');
        nuevoProductoDiv.classList.add('card');

        nuevoProductoDiv.innerHTML = `
            <div class="card-title">${producto.title}</div>
            <div class="card-description">${producto.description}</div>
            <div class="card-price">$ ${producto.price}</div>
            <div class="card-stock">Stock: ${producto.stock}</div>
            <div class="card-category">Categoría: ${producto.category}</div>
            <div class="card-category">Thumbnail: ${producto.thumbnail}</div>
        `;

        // Agregar el nuevo elemento div al contenedor de productos
        productList.appendChild(nuevoProductoDiv);
    });
})



// Escuchar el evento 'submit' del formulario
const form = document.getElementById('myForm');
form.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    const data = {
        title: title,
        description: description,
        price: price,
        code: code,
        stock: stock,
        category: category
    };

    fetch('/chats/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('No se pudo registrar el producto');
        }
    })
    .then(data => {
        socket.emit('nuevo_producto', data);
    })
    .catch(error => {

        console.error(error);
    });
});

const deleteProduct=document.getElementById("deleteProduct")

deleteProduct.addEventListener("submit",e=>{
    e.preventDefault();
    const data={
        pid:document.getElementById("pid").value
    }
    

    fetch('/chats/' + data.pid, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('NO SE PUEDO ELIMINAR EL PRODUCTO');
        }
    }).then(data => {
        if (data === true) {
            socket.emit('producto_eliminado', data);
        } else {
            alert("NO SE ENCONTRÓ PRODUCTO CON ESE ID");
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al intentar eliminar el producto');
    });
})