const loading = document.querySelector('.loading');

const token = localStorage.getItem('token');

$(document).ready(function() {
  let status = authorizeUser();
  setTokenHeader();
  displayAll();

  if(!status){
    $("#signForm").append(`<button type="button" class="signup-button btn navbar-right btn-info btn-md" data-toggle="modal" data-target="#signIn">Sign In / Up</button>`)
    displaySignForm("#signForm","signIn","inputInit")
    $('form#loginForm').submit(logIn)
    $('form#signupForm').submit(signUp)
  } else {
    $("#signForm").append(`<button type="button" class="logout btn navbar-right btn-info btn-md" data-toggle="modal" data-target=".logout">Log Out</button>`)
    $(".side-menu").append(`<li><a id="cart" href="#">CART</a></li>`)
    $('.logout').click(logout)
  }

  $(document).on('click', '.nav-sidebar li', function() {
       $(".nav-sidebar li").removeClass("active");
       $(this).addClass("active");
   });


    $("#search").keypress(function(event) {
      let name;
      let consoleType;
      if ((event.keyCode == 13) && (event.target.type != "textarea")) {
        event.preventDefault();
        $("#game-list").empty();
        $("h1.page-header").remove();
        $(".main").prepend(`<h1 class="page-header">Result</h1>`)
        name = $("#title-name").val()
        $.get('https://gamerz13.herokuapp.com/product/' + name, function(data){
        for (var i = 0; i < data.length; i++) {
          if(data[i].platform == "PS4")
          {
            consoleType = "PS4"
          }
          else if(data[i].platform == "XBOX ONE")
          {
            consoleType = "XBOX"
          }
          else if(data[i].platform == "SWITCH")
          {
            consoleType = "SWITCH"
          }
            $("#game-list").append(`<div id="${consoleType}" class="col-xs-6 col-sm-4 item-container row-height">
              <img id="title-image" src=${data[i].url} class="img-responsive title-image" alt="Generic placeholder thumbnail">
              <h4 id="title-name">${data[i].title}</h4>
              <p id="title-price"> Credit: $ ${data[i].price} </p>
              <button type="button" id="addCart" class="btn btn-default" aria-label="Left Align">
                <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">&nbsp;</span>Add Cart
              </button>
            </div>`)
          }
        })
        $("#title-name").val('');
      }
    });

  $('.allDisplay').click(function(){
    displayAll()
  })

  $('#PS4').click(function(){
    $.get('https://gamerz13.herokuapp.com/product/ps4', function(data){
      $("#game-list").empty();
      $("h1.page-header").remove();
      $(".main").prepend(`<h1 class="page-header">PS4</h1>`)
      for (var i = 0; i < data.length; i++) {
        $("#game-list").append(`<div id="PS4" class="col-xs-6 col-sm-4 item-container row-height">
          <img id="title-image" src=${data[i].url} class="img-responsive title-image" alt="Generic placeholder thumbnail">
          <h2 id="title-name">${data[i].title}</h2>
          <p id="title-price"> Credit: $ ${data[i].price} </p>
          <button type="button" id="addCart" class="btn btn-default" aria-label="Left Align">
            <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">&nbsp;</span>Add Cart
          </button>
        </div>`)
      }
    })
  })

  $('#XBOX').click(function(){
    $.get('https://gamerz13.herokuapp.com/product/xbox', function(data){
      $("#game-list").empty();
      $("h1.page-header").remove();
      $(".main").prepend(`<h1 class="page-header">XBOX ONE</h1>`)
      for (var i = 0; i < data.length; i++) {
        $("#game-list").append(`<div id="XBOX" class="col-xs-6 col-sm-4 item-container row-height">
          <img id="title-image" src=${data[i].url} class="img-responsive title-image" alt="Generic placeholder thumbnail">
          <h2 id="title-name">${data[i].title}</h2>
          <p id="title-price"> Credit: $ ${data[i].price} </p>
          <button type="button" id="addCart" class="btn btn-default" aria-label="Left Align">
            <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">&nbsp;</span>Add Cart
          </button>
        </div>`)
      }
    })
  })

  $('#SWITCH').click(function(){
    let itemName;
    $.get('https://gamerz13.herokuapp.com/product/switch' , function(data){
      $("#game-list").empty();
      $("h1.page-header").remove();
      $(".main").prepend(`<h1 class="page-header">SWITCH</h1>`)
      for (var i = 0; i < data.length; i++) {
        $("#game-list").append(`<div id="SWITCH" class="col-xs-6 col-sm-4 item-container row-height">
          <img id="title-image" src=${data[i].url} class="img-responsive title-image" alt="Generic placeholder thumbnail">
          <h2 id="title-name">${data[i].title}</h2>
          <p id="title-price"> Credit: $ ${data[i].price} </p>
          <button type="button" id="addCart" class="btn btn-default" aria-label="Left Align">
            <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">&nbsp;</span>Add Cart
          </button>
        </div>`)
      }
    })
  })


  $('#cart').click(function(){
    cartDisplay();
  })

  $(document).on('change','#counter',function() {
    let quantity = parseInt($(this).children("option:selected").text());
    let id = $(this).parents('.cart-box').before().attr('id');

    let parsedToken = parseJWT(token)

    $.ajax({
      url:`https://gamerz13.herokuapp.com/product/${parsedToken.id}/${id}`,
      type:"PUT",
      data:{quantity},
      complete: function () {
        $(".title-total").text(`Your Total Credit: $${getDataforTotal()}`);
      }
    })
  })

  $("#game-list").on('click', '#addCart',function(){
    if(status){
      let parsedToken = parseJWT(token)
      var numberPattern = /[+-]?\d+(\.\d+)?/g
      let number;
      let exist = false;
      let title = $(this).prevAll('#title-name').text();
      let platform = $(this).parent().before().attr('id');
      let price = parseFloat($(this).prevAll('#title-price').text().match(numberPattern));
      let url = $(this).prevAll('#title-image').attr('src');

      $.get(`https://gamerz13.herokuapp.com/product/${parsedToken.id}/cart`, function(data){

          for (var i = 0; i < data.length; i++) {

            let id = data[i].id

             if(data[i].quantity > 0 && data[i].title == title && data[i].platform == platform){
              number = data[i].quantity + 1;
              $.ajax({
                url:`https://gamerz13.herokuapp.com/product/${parsedToken.id}/${id}`,
                type:"PUT",
                dataType: "json",
                data:{
                  quantity:number
                },
                complete: function(data) {
                  $("#game-list").prepend(`<div class="alert alert-info alert-dismissable">
                                           <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                            <strong>Added to Cart!</strong> ${title} has been added to your cart.
                                          </div>`)
                }
               })
               exist = true;
              }
          }

          if(!exist){
            $.post(`https://gamerz13.herokuapp.com/product/${parsedToken.id}`,
            {
              title:title,
              platform:platform,
              price:price,
              url:url,
              quantity:1,
              cart_id: parsedToken.id
            },
            function(data,status){
              $("#game-list").prepend(`<div class="alert alert-info alert-dismissable">
                                       <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                        <strong>Added to Cart!</strong> ${title} has been added to your cart.
                                      </div>`)
            })
          }
      })
    } else {
      displaySignForm("#signForm","userAuth","inputVerify")
      $('form#loginForm').submit(logIn)
      $('form#signupForm').submit(signUp)
    }
  })

  $("#game-list").on('click', '#deleteItem',function(){

    let total = 0;
    let parsedToken = parseJWT(token)
    let id = $(this).parent().parent().before().attr('id')

    $.ajax({
      url:`https://gamerz13.herokuapp.com/product/${parsedToken.id}/${id}`,
      type: 'DELETE'
    })

    $.ajax({
      url:`https://gamerz13.herokuapp.com/product/${parsedToken.id}/cart`,
      type:'get',
      dataType:'JSON',
      async:false,
      success:function(e){
        data = e;
      }
    });

console.log(data.length);
    if (data.length > 0) {
      for (var i = 0; i < data.length - 1; i++) {
        total += data[i].price * data[i].quantity
      }
    }

     $(`#${id}`).fadeOut();
     $(".title-total").text(`Your Total Credit: $${ total.toFixed(2)}`);

  })
})

function cartDisplay(){
  let parsedToken = parseJWT(token)
  $.get(`https://gamerz13.herokuapp.com/product/${parsedToken.id}/cart`)
    .then(function(data){
    $("#game-list").empty();
    $("h1.page-header").remove();
    $(".main").prepend(`<h1 class="page-header">Cart</h1>`)

    if (data.length === 0) {
      $("#game-list").append(`<p>Your cart is empty.</p>`)
    } else {
      for (var i = 0; i < data.length; i++) {
        var dynamic = "";
        for (var j = 1; j < 11;j++){
          if(data[i].quantity == j){
            dynamic += `<option selected>${j}</option>`
          }
          else{
            dynamic += `<option>${j}</option>`
          }
        }
        $("#game-list").append(`<div id="${data[i].id}" class="col-xs-6 col-sm-4 cart-box">
          <img id="title-image" src=${data[i].url} class="img-responsive title-image" alt="Generic placeholder thumbnail">
          <h2 id="title-name">${data[i].title}</h2>
          <p id="title-price"> Credit: $ ${data[i].price} </p
          <div class="input-container row">
           <div class="input-box">
            <button type="button" id="deleteItem" class="btn btn-default col-sm-6 col-xs-6" aria-label="Left Align">
              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;Delete
            </button>
            <form>
              <div class="form-group col-sm-4 col-xs-5 item-counter">
                <select class="form-control" id="counter">
                ${dynamic}
                </select>
              </div>
            </form>
            </div>
          </div>
        </div>`)
        }
        $("#game-list").append(`<div class="footer navbar-fixed-bottom">
                            		<div class="container footer-color">
                                   		 <h3 class="title-total calculate">Your Total Credit: $${getDataforTotal()}</h3>
                               		</div>
                                </div>`)
    }
  })
}

function displayAll(){
  $.get('https://gamerz13.herokuapp.com/product/', function(data){
    $("#game-list").empty();
    $("h1.page-header").remove();
    $(".main").prepend(`<h1 class="page-header">ALL</h1>`)
  for (var i = 0; i < data.length; i++) {
    if(data[i].platform == "PS4")
    {
      consoleType = "PS4"
    }
    else if(data[i].platform == "XBOX ONE")
    {
      consoleType = "XBOX"
    }
    else if(data[i].platform == "SWITCH")
    {
      consoleType = "SWITCH"
    }

    $("#game-list").append(`<div id="${consoleType}" class="col-xs-6 col-sm-4 item-container row-height">
      <img id="title-image" src=${data[i].url} class="img-responsive title-image" alt="Generic placeholder thumbnail">
      <h2 id="title-name">${data[i].title}</h2>
      <p id="title-price"> Credit: $ ${data[i].price} </p>
      <button type="button" id="addCart" class="btn btn-default" aria-label="Left Align" data-toggle="modal" data-target="#userAuth">
        <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">&nbsp;</span>Add Cart
      </button>
    </div>`)
    }
  })
}

function authorizeUser() {
  let status = false;
  const token = localStorage.getItem('token')
  if(token){
    status = true;
  }

  return status;
}

function logIn(event) {
  event.preventDefault();
  var email, password, data;
  if($(`input[name=login-email].inputInit.inputInit`).val()){
    email = $(`input[name=login-email]`).val();
    password = $(`input[name=login-password]`).val();
  } else {
    email = $(`input[name=login-email].inputVerify`).val();
    password = $(`input[name=login-password].inputVerify`).val();
  }
  data = {email,password}

  $.post("https://gamerz13.herokuapp.com/auth/login", data)
    .then(response => {
      if(response.error) {
        alert(response.error)
      } else {
        localStorage.setItem('token', response.data)
        location.href = '/'
      }
    })
}

function signUp(event,){
  event.preventDefault();
  var username, email, password, data;
  if($(`input[name=signup-username].inputInit.inputInit`).val()){
    username = $(`input[name=signup-username].inputInit`).val();
    email = $(`input[name=signup-email]`).val();
    password = $(`input[name=signup-password]`).val();
  } else {
    username = $(`input[name=signup-username.inputVerify]`).val();
    email = $(`input[name=login-email].inputVerify`).val();
    password = $(`input[name=login-password].inputVerify`).val();
  }
    data = {username, email, password}

  $.post("https://gamerz13.herokuapp.com/auth/signup", data)
    .then(response => {
      if (!response || response.error) {
        alert("Email Address Already in Use")
      } else {
        localStorage.setItem('token', response.data)
        location.href = '/'
      }
    })
}

function logout() {
  localStorage.removeItem('token')
  location.href = '/'
}

function setTokenHeader() {
  if (token) {
    $.ajaxSetup({
      headers: {Authorization: `Bearer ${token}`}
    });
  }
}

function parseJWT (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

function displaySignForm (signup,authorize,inputForm) {
  $(`${signup}`).append(`<div id="${authorize}" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <form class="form-horizontal" method="POST" id="loginForm" role="form">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Sign In</h4>
        </div>
        <div class="modal-body">
          <div class="form-group animated fadeIn">
            <label for="titleInput" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
              <input type="email" name="login-email" class="form-control ${inputForm}" placeholder="John@Kimbo.com" required>
            </div>
          </div>
          <div class="form-group animated fadeIn">
            <label for="titleInput" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
              <input type="password" name="login-password" class="form-control ${inputForm}" placeholder="Enter your password" required>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" data-dismiss="modal" class="btn navbar-left btn-default" data-toggle="modal" data-target="#signUp">Sign Up</button>
          <button type="submit" class="btn btn-default login Button">Log In</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </form>
    </div>
  </div>
  <div id="signUp" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <form class="form-horizontal" id="signupForm" method="POST" role="form">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Sign Up</h4>
        </div>
        <div class="modal-body">
          <div class="form-group animated fadeIn">
            <label for="username" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
              <input type="email" name="signup-email" class="form-control ${inputForm}" placeholder="John@Kimbo.com" required>
            </div>
          </div>
          <div class="form-group animated fadeIn">
            <label for="username" class="col-sm-2 control-label">Username</label>
            <div class="col-sm-10">
              <input type="text" name="signup-username" class="form-control ${inputForm}" placeholder="Please enter user name" required>
            </div>
          </div>
          <div class="form-group animated fadeIn">
            <label for="password" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
              <input type="password" name="signup-password" class="form-control ${inputForm}" placeholder="Enter your password" required>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" data-dismiss="modal" class="btn navbar-left btn-default" data-toggle="modal" data-target="#signIn">Sign In</button>
          <button type="submit" class="btn btn-default signup Button">Sign Up</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </form>
    </div>
  </div>`)
}

function getDataforTotal() {

  let data;
  let total = 0;
  let parsedToken = parseJWT(token)

  $.ajax({
    url:`https://gamerz13.herokuapp.com/product/${parsedToken.id}/cart`,
    type:'get',
    dataType:'JSON',
    async:false,
    success:function(e){
      data = e;
    }
  });

  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {

      total += data[i].price * data[i].quantity
    }
  }
  return total.toFixed(2);
}
