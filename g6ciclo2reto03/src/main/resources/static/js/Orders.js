// const URL_PRODUCTS = "http://localhost:8080/api/gadget/";
// const URL_ORDERS = "http://localhost:8080/api/order/";
const URL_PRODUCTS = "http://143.47.105.106:8080/api/gadget/";
const URL_ORDERS = "http://143.47.105.106:8080/api/order/";
const tHeaders = ['ID', 'Asesor', 'Fecha', 'Status','Productos'];
const tHeaders_order = ['ID', 'Marca', 'Categoria', 'Nombre','Precio', 'Disp', 'Foto', 'Solicitud', 'subtotal'];
const tHeaders_information = ['ID', 'Asesor', 'Fecha', 'Status'];
let allProducts;



async function createOrder() {
    let orderedProducts = {};
    let orderedQuantities = {};
      
    $('td.dataId').each(function(index) {
      let contenido = $(this).text();
      allProducts.forEach((product)=> {
        if(contenido==product.id.toString()) {orderedProducts[index+1]=product;}
      });
    });

    $('.subtotal').each(function(index) {
      orderedQuantities[index+1]=parseFloat($(this).closest('tr').find('.quantity').val());
    });

    let order = {
        id:parseInt($("#identification").val()),
        registerDay:new Date().toISOString(),
        status:"Pendiente",
        salesMan:JSON.parse(sessionStorage.getItem("logUser")),
        products:orderedProducts,
        quantities:orderedQuantities
    };

    // alert("estoy aqui")

    try {
        await $.ajax({
        url: URL_ORDERS +"new",
        type: "POST",
        contentType:"application/json",
        data:JSON.stringify(order),
        success: function (response) {
        alert("Se ha agregado pedido");
        // location.href = "./Login.html";
        },
        error: function (xhr, status) {
        alert("No fue posible agregar el pedido");
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

function getOrders() {
    $.ajax({
      url: URL_ORDERS + 'all',
      type: "GET",
      dataType: "json",
  
      success: function (response) {
        showOrders(response); //"response.items" has been deleted 'cause it doesn't work forward
      },
      error: function (xhr, status) {
        alert("ha sucedido un problema");
      },
      complete: function (xhr, status) {
        //   alert("Petición realizada");
      },
    });
  }
  
  function showOrders(data) {
    idTableHtml = 'orders_table';
    let htmlCode = "";

    //create the header's table of orders
    htmlCode += " <thead class='thead-dark'><tr>"
    tHeaders.forEach(element => {
        htmlCode += "<th>" + element + "</th>";
    });
    htmlCode += "<th>APROBACIÓN</th>" +
            "</tr></thead> ";
         
    //fill the table's body with data from oracle DB
    //['ID', 'Asesor', 'Fecha', 'Status'];
  htmlCode += "<tbody>";
  for (let i = 0; i < data.length; i++) {
    htmlCode += "<tr class='centrar text-center'>";
    htmlCode += "<td>" + data[i].id + "</td>";
    htmlCode += "<td>" + data[i].salesMan.name + "</td>";
    htmlCode += "<td>" + new Date(data[i].registerDay).toLocaleDateString() + "</td>";
    htmlCode += "<td id='status_" + data[i].id + "'>" + data[i].status + "</td>";
    htmlCode += "<td><a href='#' onclick='dataStorageSession(" + data[i].id + ",\"order\",tHeaders_information)'>Consultar</a></td>";
    htmlCode += "<td><button class='btn btn-success mr-2' onclick='updateOrder(" + data[i].id + ",\"Aprobado\")'>✓</button><button class='btn btn-danger' onclick='updateOrder(" + data[i].id + ",\"Rechazado\")'>✕</button></td>";
    htmlCode += "</tr>";
    }
    htmlCode += "</tbody>";
  
    //erase the table with old data and put new data 
    $("#" + idTableHtml).html("");
    $("#" + idTableHtml).empty();
    $("#" + idTableHtml).append(htmlCode);
  }

  function updateOrder(orderId, status){
    let dataInfo = {
      id: parseInt(orderId),
      status: status
    };

    $.ajax({
      url: URL_ORDERS + 'update',
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(dataInfo),
      asinc:false,
      success: function (response) {
        $("#status_"+orderId).text(status);
      },
      error: function (xhr, status) {
        alert("ha sucedido un problema");
      },
      complete: function (xhr, status) {
        //   alert("Petición realizada");
      },
    });
  }

//============================================    
function getProducts() {
    $.ajax({
      url: URL_PRODUCTS + 'all',
      type: "GET",
      dataType: "json",
  
      success: function (response) {
        allProducts = response;
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
    let htmlCode_order = "";
    let htmlTotal = "";
  
    //create the header's void table of orders
    htmlCode_order += " <thead class='thead-dark'><tr>"
    
    tHeaders_order.forEach(element => {
        htmlCode_order += "<th>" + element + "</th>";
    });
    htmlCode_order += "<th>Eliminar</th>" +
            "</tr></thead> ";
    htmlCode_order += "<tbody id='listOrderedProducts'></tbody>";
    $("#products_table_order").append(htmlCode_order);

    //create the header's void table of total
    htmlTotal += " <thead class='thead-dark'><tr>"
    htmlTotal += "<th style='width: 100px;' class='text-right'>Total</th>";
    htmlTotal += "<th id='totalValue' style='width: 200px;' class='text-right'>$ 0</th>" +
            "</tr></thead> ";
    $("#total").append(htmlTotal);
    

    //create the header's table of products
    htmlCode += " <thead class='thead-dark'><tr>"
    tHeaders.forEach(element => {
        htmlCode += "<th>" + element + "</th>";
    });
    htmlCode += "<th>AGREGAR</th>" +
            "</tr></thead> ";
         
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
    htmlCode += "<td><button class='btn btn-primary' onclick='addProductOrder(" + JSON.stringify(data[i]) + ")'>Agregar</button></td>";
    htmlCode += "</tr>";
    }
    htmlCode += "</tbody>";
  
    //erase the table with old data and put new data 
    $("#" + idTableHtml).html("");
    $("#" + idTableHtml).empty();
    $("#" + idTableHtml).append(htmlCode);
  }
  
  function addProductOrder(data) {
    let idElementsOrdered = $('td.dataId');
    let existProductOrder = false;
    
    //valida que el producto agregado no se encuentre en la tabla de pedidos
    idElementsOrdered.each(function() {
      let contenido = $(this).text();
      if(contenido==data.id.toString()) {existProductOrder=true;}
    });
    
    if(!existProductOrder){
      let htmlCode_order = "";
      htmlCode_order += "<tr id='row"+data.id+"'>";
      htmlCode_order += "<td class='dataId'>" + data.id + "</td>";
      htmlCode_order += "<td>" + data.brand + "</td>";
      htmlCode_order += "<td>" + data.category + "</td>";
      htmlCode_order += "<td>" + data.name + "</td>";
      htmlCode_order += "<td class='price'>" + data.price + "</td>";
      htmlCode_order += "<td>" + (data.availability==true?"SI":"NO") + "</td>";
      htmlCode_order += "<td><img src='" + data.photography + "' alt='Imagen' class='img-thumbnail img-fluid'></td>";
      htmlCode_order += "<td><input type='number' class='quantity' style='width: 50px;' value='1' id='quantity_" + data.id + "'></td>";
      htmlCode_order += "<td class='subtotal'> " + data.price + "</td>";
      htmlCode_order += "<td><button class='btn btn-danger' onclick='deleteProductOrdered(" + data.id + ")'>X</button></td>";
      htmlCode_order += "</tr>";
      $("#listOrderedProducts").append(htmlCode_order);
    }
  }

  function deleteProductOrdered(rowId) {$('#row'+rowId).remove();}
  
  function deleteData(id, tableType){
    $.ajax({
      url: URL_ORDERS + id.toString(),
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

function calculateTotal() {
  let sumaTotal = 0;
  
  $('.subtotal').each(function() {
    let quantity = parseFloat($(this).closest('tr').find('.quantity').val());
    let unitaryCost = parseFloat($(this).closest('tr').find('.price').text());
    let subtotal = quantity * unitaryCost;
    parseFloat($(this).text(subtotal.toLocaleString()));
    sumaTotal += subtotal
  });

  $('#totalValue').text('$ ' + sumaTotal.toLocaleString());
}

