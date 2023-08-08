// const URL_PRODUCTS = "http://localhost:8080/api/gadget/";
const URL_PRODUCTS = "http://143.47.105.106:8080/api/gadget/";
const tHeaders = ['ID', 'Marca', 'Categoría', 'Nombre', 'Precio', 'Disp', 'Cant', 'foto'];

async function createProduct() {
    let available = () => {
        if($("#availability").val()=="true"){
            return true;
        } else {
            return false;
        }
    }
    
    let product = {
        id:parseInt($("#identification").val()),
        brand:$("#brand").val(),
        category:$("#category").val(),
        name: $("#name").val(),
        description:$("#description").val(),
        price:$("#price").val(),
        availability:available,
        quantity:$("#quantity").val(),
        photography:$("#photography").val()
    };

    try {
        await $.ajax({
        url: URL_PRODUCTS +"new",
        type: "POST",
        contentType:"application/json",
        data:JSON.stringify(product),
        success: function (response) {
        alert("Se ha agregado un producto");
        // location.href = "./Login.html";
        },
        error: function (xhr, status) {
        alert("No fue posible agregar el producto");
        },
        complete: function (xhr, status) {
        //   alert("Petición realizada");
        },
        });
        
    } catch (error) {
        alert("Error: " + error);
    }
}

// =================================================================

function getProducts() {
    $.ajax({
      url: URL_PRODUCTS + 'all',
      type: "GET",
      dataType: "json",
  
      success: function (response) {
        showProducts(response); //"response.items" has been deleted 'cause it doesn't work forward
      },
      error: function (xhr, status) {
        alert("ha sucedido un problema");
      },
      complete: function (xhr, status) {
        //   alert("Petición realizada");
      },
    });
  }
  
  function showProducts(data) {
    idTableHtml = 'products_table';
    let htmlCode = "";
  
    //create the header's table
    htmlCode += " <thead class='thead-dark'><tr>"
    tHeaders.forEach(element => {
        htmlCode += "<th>" + element + "</th>";
    });
    htmlCode += "<th>EDITAR</th>" +
            "<th>ELIMINAR</th>"  +
            "</tr></thead> ";
// ['ID', 'Marca', 'Categoría', 'Nombre', 'Precio', 'Disponibilidad', 'Cant', 'foto'];
  //fill the table's body with data from oracle DB
  htmlCode += "<tbody>";
  for (let i = 0; i < data.length; i++) {
    htmlCode += "<tr class='centrar'>";
    htmlCode += "<td>" + data[i].id + "</td>";
    htmlCode += "<td>" + data[i].brand + "</td>";
    htmlCode += "<td>" + data[i].category + "</td>";
    htmlCode += "<td>" + data[i].name + "</td>";
    htmlCode += "<td>" + data[i].price + "</td>";
    htmlCode += "<td>" + (data[i].availability==true?"SI":"NO") + "</td>";
    htmlCode += "<td>" + data[i].quantity + "</td>";
    htmlCode += "<td><img src='" + data[i].photography + "' alt='Imagen' class='img-thumbnail img-fluid'></td>";
    htmlCode += "<td><a href='#' onclick='dataStorageSession(" + data[i].id + ",\"gadget\",tHeaders)'>Consultar-Editar</a></td>";
    htmlCode += "<td><a href='#' onclick='deleteData(" + data[i].id + ",\"gadget\")'>Eliminar</a></td>";
    htmlCode += "</tr>";
    }
    htmlCode += "</tbody>";
  
    //erase the table with old data and put new data 
    $("#" + idTableHtml).html("");
    $("#" + idTableHtml).empty();
    $("#" + idTableHtml).append(htmlCode);
  }
  
  
  function deleteData(id, tableType){
    $.ajax({
      url: URL_PRODUCTS + id.toString(),
      type: "DELETE",
      success: function (response) {
        //alert('Registro Eliminado');
        getProducts();
      },
      error: function (xhr, status) {
        alert("ha sucedido un problema");
      },
      complete: function (xhr, status) {
        //   alert("Petición realizada");
      },
    });
  }