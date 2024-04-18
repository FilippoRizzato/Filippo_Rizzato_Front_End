window.onload = function () {
    fetchProducts();
};

function fetchProducts() {
    fetch('http://localhost:8888/products', {mode: "cors"})
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            data.data.forEach(product => {
                const row = `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.attributes.marca}</td>
                        <td>${product.attributes.nome}</td>
                        <td>${product.attributes.prezzo}</td>
                        <td>
                            <button type="button" class="btn btn-primary" onclick="showProduct(${product.id})">Visualizza</button>
                            <button type="button" class="btn btn-warning" onclick="editProduct(${product.id})">Modifica</button>
                            <button type="button" class="btn btn-danger" onclick="deleteProduct(${product.id})">Cancella</button>
                        </td>
                    </tr>
                `;
                productList.innerHTML += row;
            });
        });
}

function showProduct(id) {
    fetch(`http://localhost:8888/products/${id}`, {mode: "cors"})
        .then(response => response.json())
        .then(data => {
            const modalBody = document.getElementById('showModalBody');
            modalBody.innerHTML = `
                <p><strong>Marca:</strong> ${data.data.attributes.marca}</p>
                <p><strong>Modello:</strong> ${data.data.attributes.nome}</p>
                <p><strong>Prezzo:</strong> ${data.data.attributes.prezzo}</p>
            `;
            $('#showModal').modal('show');
        });
}
// Aggiungere tasto modifica
function editProduct(id) {
    fetch(`http://localhost:8888/products/${id}`, {mode: "cors"})
        .then(response => response.json())
        .then(data => {
            const modalBody = document.getElementById('editModalBody');
            modalBody.innerHTML = `
                <input type="hidden" id="productId" value="${data.data.id}">
                <div class="mb-3">
                    <label for="marcaEdit" class="form-label">Marca</label>
                    <input type="text" class="form-control" id="marcaEdit" value="${data.data.attributes.marca}">
                </div>
                <div class="mb-3">
                    <label for="modelloEdit" class="form-label">Modello</label>
                    <input type="text" class="form-control" id="modelloEdit" value="${data.data.attributes.nome}">
                </div>
                <div class="mb-3">
                    <label for="prezzoEdit" class="form-label">Prezzo</label>
                    <input type="text" class="form-control" id="prezzoEdit" value="${data.data.attributes.prezzo}">
                </div>
            `;
            $('#editModal').modal('show');
        });
}



function deleteProduct(id) {
    $('#deleteModal').modal('show')
    document.getElementById('deleteBtn').addEventListener('click',function () { 
        fetch(`http://localhost:8888/products/${id}`, {
        method: 'DELETE',
        mode: "cors",
    })
    .then(response => {
        if (response.ok) {
            // Ricarica la lista dei prodotti dopo la modifica
            fetchProducts();
            // Chiudi il modale di modifica
            $('#deleteModal').modal('hide');
        } else {
            // Gestisci l'errore
        }
    });
    });

}
document.getElementById('createProductModal').addEventListener('click',function () { $('#createModal').modal('show')});

document.getElementById('createProductBtn').addEventListener('click', function ()  {
    const formData = { 
        data: [
        {
            "attributes": {
                "marca": document.getElementById('marcaNew').value,
                "nome": document.getElementById('modelloNew').value,
                "prezzo": parseInt(document.getElementById('prezzoNew').value)
            }
        }
        ]
    };

    fetch(`http://localhost:8888/products`, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    } , {mode: "cors"})
    .then(response => {
        if (response.ok) {
            // Ricarica la lista dei prodotti dopo la modifica
            fetchProducts();
            // Chiudi il modale di modifica
            $('#createModal').modal('hide');
        } else {
            // Gestisci l'errore
        }
    });
});




document.getElementById('saveChanges').addEventListener('click', function () {
    const id_form = document.getElementById('productId').value;
    const formData = { 
        data: [
        {
            "attributes": {
                "marca": document.getElementById('marcaEdit').value,
                "nome": document.getElementById('modelloEdit').value,
                "prezzo": parseInt(document.getElementById('prezzoEdit').value)
            }
        }
        ]
    };
    
    fetch(`http://localhost:8888/products/${id_form}`, {
        method: 'PATCH',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            // Ricarica la lista dei prodotti dopo la modifica
            fetchProducts();
            // Chiudi il modale di modifica
            $('#editModal').modal('hide');
        } else {
            // Gestisci l'errore
        }
    });
});


