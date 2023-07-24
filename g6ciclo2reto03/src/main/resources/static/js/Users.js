// const URL_USER = "http://localhost:8080/api/user/";
const URL_USER = "http://143.47.105.106:8080/api/user/";
const tHeaders = ['ID', 'Identificacion', 'Nombre', 'celular', 'Email', 'Tipo', 'Zona'];

function validateUser() {
    let user = {
        email: $("#email").val(),
        password: $("#password").val()
    };

  try {
    $.ajax({
      url: URL_USER + user.email + "/" + user.password,
      type: "GET",
      dataType: "json",
      success: function (response) {
        if(response.id == null){alert("No existe usuario");}
        else{
          alert("Bienvenido: " + response.name);
          sessionStorage.setItem("id",response.id);
          sessionStorage.setItem("thisUrl", window.location.href);
          location.href = "./mainMenu.html";
        }
          
      },
      error: function (xhr, status) {
        alert("No existe usuario");
      },
      complete: function (xhr, status) {
        //   alert("Petición realizada");
      },
    });
  } catch (error) {
    alert(error);
  }
}

function validateEmail() {
  let user = {
      email: $("#emailRegister").val(),
  };

  $.ajax({
    url: URL_USER + "emailexist/"+ user.email,
    type: "GET",
    dataType: "json",
    success: function (response) {
      if(response){
        //alert("Correo ya existe");
        $('#emailRegister').focus();
        $('#emailRegister').select();
        $('.invalid-feedback').show();
      } else{
        $('.invalid-feedback').hide();
      }
    },
    error: function (xhr, status) {
      // alert("Error");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}

// validate if email exists in the textbox. if not, it will activate
$(document).ready(function() {
  $('#emailRegister').blur(function() {
    validateEmail();
  });
});

async function createUser() {
  let user = {
    id: parseInt($("#id").val()),
    identification: $("#identification").val(),
    name: $("#name").val(),
    address: $("#address").val(),
    cellPhone: $("#cellPhone").val(),
    email: $("#emailRegister").val(),
    password: $("#password").val(),
    zone: $("#zone").val(),
    type: $("#profile").val()
  };

  try {
    await $.ajax({
    url: URL_USER +"new",
    type: "POST",
    contentType:"application/json",
    data:JSON.stringify(user),
    success: function (response) {
      alert("Cuenta creada de forma correcta");
      // location.href = "./Login.html";
    },
    error: function (xhr, status) {
      alert("No fue posible crear la cuenta");
    },
    complete: function (xhr, status) {
    //   alert("Petición realizada");
    },
    });
    
  } catch (error) {
    alert("Error: " + error);
  }
}

//================================================================

function welcomeUser(){
  let user = {
    id:parseInt(sessionStorage.getItem("id"))
  };

  $.ajax({
    url: URL_USER + user.id,
    type: "GET",
    dataType: "json",
    success: function (response) {
      if(response.id == null){alert("No existe usuario");}
      else{
        $("#name").text(response.name);
        let profile;
        if(response.type=="COORD"){profile= "COORDINADOR"}
        if(response.type=="ASE"){profile= "ASESOR"}
        if(response.type=="ADM"){profile= "ADMINISTRADOR"}
        $("#type").text(profile);
      }
      
    },
    error: function (xhr, status) {
      alert("No existe usuario");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });

}

// =================================================================

function getUsers() {
  $.ajax({
    url: URL_USER + 'all',
    type: "GET",
    dataType: "json",

    success: function (response) {
      showUsers(response); //"response.items" has been deleted 'cause it doesn't work forward
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}

function showUsers(data) {
  idTableHtml = 'users_table';
  let htmlCode = "";

  //create the header's table
  htmlCode += " <thead class='thead-dark'><tr>"
  tHeaders.forEach(element => {
      htmlCode += "<th>" + element + "</th>";
  });
  htmlCode += "<th>EDITAR</th>" +
          "<th>ELIMINAR</th>"  +
          "</tr></thead> ";
      
//fill the table's body with data from oracle DB
htmlCode += "<tbody>";
for (let i = 0; i < data.length; i++) {
  htmlCode += "<tr class='centrar'>";
  htmlCode += "<td>" + data[i].id + "</td>";
  htmlCode += "<td>" + data[i].identification + "</td>";
  htmlCode += "<td>" + data[i].name + "</td>";
  htmlCode += "<td>" + data[i].cellPhone + "</td>";
  htmlCode += "<td>" + data[i].email + "</td>";
  htmlCode += "<td>" + data[i].type + "</td>";
  htmlCode += "<td>" + data[i].zone + "</td>";
  htmlCode += "<td><a href='#' onclick='dataStorageSession(" + data[i].id + ",\"user\",tHeaders)'>Consultar-Editar</a></td>";
  htmlCode += "<td><a href='#' onclick='deleteData(" + data[i].id + ",\"user\")'>Eliminar</a></td>";
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
    url: URL_USER + id.toString(),
    type: "DELETE",
    success: function (response) {
      //alert('Registro Eliminado');
      getUsers();
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}