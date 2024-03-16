var inventario = [];

function agregarProducto() {
    var producto = document.getElementById("producto").value;
    var cantidad = parseInt(document.getElementById("cantidad").value);
    var precio = parseFloat(document.getElementById("precio").value);
    var foto = document.getElementById("foto").files[0];
    
    inventario.push({producto: producto, cantidad: cantidad, precio: precio, foto: foto});
    
    mostrarInventario();
}

function mostrarInventario() {
    var listaProductos = document.getElementById("listaProductos");
    var totalHTML = document.getElementById("total");
    listaProductos.innerHTML = "";
    totalHTML.innerHTML = "Total de cada ítem:<br>";
    
    var totalGeneral = 0;

    inventario.forEach(function(item) {
        var nuevoProducto = document.createElement("li");
        var totalItem = item.cantidad * item.precio;
        totalGeneral += totalItem;

        nuevoProducto.textContent = item.producto + " - " + item.cantidad + " unidades - Precio total: $" + totalItem.toFixed(2);

        if(item.foto) {
            var preview = document.createElement("img");
            preview.src = URL.createObjectURL(item.foto);
            nuevoProducto.appendChild(preview);
        }

        listaProductos.appendChild(nuevoProducto);
    });

    totalHTML.innerHTML += "Total general: $" + totalGeneral.toFixed(2);
}

function exportarExcel() {
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Inventario",
        Subject: "Datos del inventario",
        Author: "Tú",
        CreatedDate: new Date()
    };

    var ws = XLSX.utils.json_to_sheet(inventario);
    XLSX.utils.book_append_sheet(wb, ws, "Inventario");

    XLSX.writeFile(wb, "inventario.xlsx");
}

function previewFoto(event) {
    var foto = event.target.files[0];
    var preview = document.createElement("img");
    preview.src = URL.createObjectURL(foto);
    document.getElementById("formulario").appendChild(preview);
}
