const URL_INFO = 'http://143.47.105.106:8080/api/';
// const URL_INFO = 'http://localhost:8080/api/'
var arrayData = {};
var dataTemp;

function returnLastWebPage(){
    location.href = sessionStorage.getItem("thisUrl");
}

function dataStorageSession(id, tableType, tHeaders){
    sessionStorage.setItem("id",id);
    sessionStorage.setItem("table_type",tableType);
    sessionStorage.setItem("thisUrl", window.location.href);
    sessionStorage.setItem("tHeaders", tHeaders);
    location.href = './information.html';
}

function getDetail(){
    let id = parseInt(sessionStorage.getItem("id"));
    let tableType = sessionStorage.getItem("table_type");
    let tHeaders = sessionStorage.getItem("tHeaders").split(",");

    $.ajax({
        url: URL_INFO + tableType  + "/" + id,
        type: "GET",
        dataType: "json",
        success: function (response) {
          dataTemp = response;
          showDetails(response, tHeaders);
        },
        error: function (xhr, status) {
          alert("ha sucedido un problema");
        },
        complete: function (xhr, status) {
          //   alert("Petición realizada");
        },
      });
}

function showDetails(dataInfo, tHeaders){
  let tableType = sessionStorage.getItem("table_type");
  let idTableHtml = 'detail_table';
  let htmlCode = "";
  arrayData = dataInfo;

  //create the content of the table
  htmlCode += (function(data,table){
    switch (table) {
      case 'user':
        return userTable(data);

      case 'gadget':
        return gadgetTable(data);

      case 'order':
        showListProducts(data);
        return orderTable(data);

      default:
        return '';
    }
  })(dataInfo,tableType);

//erase the table with old data and put new data 
$("#" + idTableHtml).html("");
$("#" + idTableHtml).empty();
$("#" + idTableHtml).append(htmlCode);
$('#profile').val(dataInfo.type); 

$('#availability_selector').val(dataInfo.availability==true?'true':'false');

}

function showListProducts(data){
  $('#product_list').show();
  idTableHtml = 'products_table';
  let tHeadersProducts = ['ID', 'Marca', 'Categoría', 'Nombre', 'Precio', 'Disp', 'Stock', 'Solicitadas', 'foto'];
  let htmlCode1 = "";

  //create the header's table
  htmlCode1 += " <thead class='thead-dark'><tr>"
  tHeadersProducts.forEach(element => {
      htmlCode1 += "<th>" + element + "</th>";
  });
  htmlCode1 += "</tr></thead>";

//fill the table's body with data from oracle DB
htmlCode1 += "<tbody>";
let cont=1;
Object.values(data.products).forEach(product=>{
  htmlCode1 += "<tr class='centrar text-center'>";
  htmlCode1 += "<td>" + product.id + "</td>";
  htmlCode1 += "<td>" + product.brand + "</td>";
  htmlCode1 += "<td>" + product.category + "</td>";
  htmlCode1 += "<td>" + product.name + "</td>";
  htmlCode1 += "<td>" + product.price + "</td>";
  htmlCode1 += "<td>" + (product.availability==true?"SI":"NO") + "</td>";
  htmlCode1 += "<td>" + product.quantity + "</td>";
  htmlCode1 += "<td>" + data.quantities[cont] + "</td>";
  htmlCode1 += "<td><img src='" + product.photography + "' alt='Imagen' class='img-thumbnail img-fluid'></td>";
  htmlCode1 += "</tr>";
  cont +=1;
  });
  htmlCode1 += "</tbody>";

  //erase the table with old data and put new data 
  $("#" + idTableHtml).html("");
  $("#" + idTableHtml).empty();
  $("#" + idTableHtml).append(htmlCode1);

}

//=================================================================================================================
// These functions return the values into the table depending on the specified case
function userTable(data){
  result = '';
  result += "<tr><th scope='row' class='text-right px-3'>ID</th><td class='form-control'>" + data.id + "</td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>IDENTIFICACION</th><td><input class='form-control' id='identification' type='text' value='" + data.identification + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>NOMBRE</th><td><input class='form-control' id='name' type='text' value='" + data.name + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>DIRECCION</th><td><input class='form-control' id='address' type='text' value='" + data.address + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>CELULAR</th><td><input class='form-control' id='cellPhone' type='text' value='" + data.cellPhone + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>CORREO</th><td><input class='form-control' id='emailRegister' type='text' value='" + data.email + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>CONTRASEÑA</th><td><input class='form-control' id='password' type='password' value='" + data.password + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>ZONA</th><td><input class='form-control' id='zone' type='text' value='" + data.zone + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>TIPO</th><td>" + showType() + "</td></tr>"; 
  return result;
}

function gadgetTable(data){
  result = '';
  result += "<tr><th scope='row' class='text-right px-3'>ID</th><td class='form-control'>" + data.id + "</td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>MARCA</th><td><input class='form-control' id='brand' type='text' value='" + data.brand + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>CATEGORÍA</th><td><input class='form-control' id='category' type='text' value='" + data.category + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>NOMBRE</th><td><input class='form-control' id='name' type='text' value='" + data.name + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>DESCRIPCIÓN</th><td><textarea class='form-control' id='description' cols='50' rows='3'>" + data.description + "</textarea></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>PRECIO</th><td><input class='form-control' id='price' type='number' value='" + data.price + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>DISPONIBILIDAD</th><td>" + showAvailability() + "</td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>CANTIDAD</th><td><input class='form-control' id='quantity' type='number' value='" + data.quantity + "'></td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>FOTOGRAFIA</th><td><input class='form-control' id='photography' type='text' value='" + data.photography + "'></td></tr>";
  return result;
}

function orderTable(data){
  result = '';
  result += "<tr><th scope='row' class='text-right px-3'>ID</th><td class='form-control'>" + data.id + "</td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>ASESOR</th><td class='form-control'>" + data.salesMan.name + "</td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>FECHA</th><td class='form-control'>" + new Date(data.registerDay).toLocaleDateString() + "</td></tr>";
  result += "<tr><th scope='row' class='text-right px-3'>STATUS</th><td class='form-control'>" + data.status + "</td></tr>";
  return result;
}

//================================================================================================================

//------------------------------------------------------------------------------
// the next functions are used to get the SCORE aviable into the SELECTOR
function showType() {
  let htmlCode = '';
  htmlCode += "<select class='form-control' id='profile'>"
  htmlCode += "<option value='COORD'>Coordinador</option>";
  htmlCode += "<option value='ASE'>Asesor</option>";
  htmlCode += "<option value='ADM'>Administrador</option>";
  htmlCode += "</select>";
 return htmlCode;
}

function showAvailability() {
    let htmlCode = '';
    htmlCode += "<select class='form-control' id='availability_selector'>"
    htmlCode += "<option value='true'>SI</option>";
    htmlCode += "<option value='false'>NO</option>";
    htmlCode += "</select>";
   return htmlCode;
}
//------------------------------------------------------------------------------

function updateData(tableType){
  let dataInfo = (function(data,table){
    switch (table) {
      case 'user':
        return userDataUpdate(data);

      case 'gadget':
        return gadgetDataUpdate(data);

      default:
        return '';
    }
  })(dataTemp,tableType);

  
  $.ajax({
    url: URL_INFO + tableType + "/update",
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(dataInfo),
    success: function (response) {
        alert('Registro Actualizado');
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      location.href = sessionStorage.getItem("thisUrl");
    },
  });

}

//=================================================================================================================
// These functions return the values into the table depending on the specified case

function userDataUpdate(data){
  return {
    id: data.id,
    identification: $("#identification").val(),
    name: $("#name").val(),
    address: $("#address").val(),
    cellPhone: $("#cellPhone").val(),
    email: $("#emailRegister").val(),
    password: $("#password").val(),
    zone: $("#zone").val(),
    type: $("#profile").val()
  }
}

function gadgetDataUpdate(data){
    return {
        id:data.id,
        brand:$("#brand").val(),
        category:$("#category").val(),
        name: $("#name").val(),
        description:$("#description").val(),
        price:$("#price").val(),
        availability:$("#availability_selector").val()=='true' ? true : false,
        quantity:$("#quantity").val(),
        photography:$("#photography").val()
    }
}