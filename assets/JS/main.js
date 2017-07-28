const loading = document.querySelector('.loading');

$(document).ready(function() {


    $("#search").keypress(function(event) {
      let name;
      let consoleType;
      if ((event.keyCode == 13) && (event.target.type != "textarea")) {
        event.preventDefault();
        $("#game-list").empty();
        name = $("#title-name").val()
        $.get('https://afternoon-bastion-62299.herokuapp.com/product/' + name, function(data){
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
            $("#game-list").append(`<div id="${consoleType}" class="col-xs-6 col-sm-3 row-height">
              <img id="title-image" src=${data[i].url} class="img-responsive title-image" alt="Generic placeholder thumbnail">
              <h2 id="title-name">${data[i].title}</h2>
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

  $('#all').click(function(){
    $.get('https://afternoon-bastion-62299.herokuapp.com/product/' + name, function(data){
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

      $("#game-list").append(`<div id="${consoleType}" class="col-xs-6 col-sm-3 row-height">
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

  $('#PS4').click(function(){
    $.get('https://afternoon-bastion-62299.herokuapp.com/product/ps4', function(data){
      $("#game-list").empty();
      for (var i = 0; i < data.length; i++) {
        $("#game-list").append(`<div id="PS4" class="col-xs-6 col-sm-3 row-height">
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
    $.get('https://afternoon-bastion-62299.herokuapp.com/product/xbox', function(data){
      $("#game-list").empty();
      for (var i = 0; i < data.length; i++) {
        $("#game-list").append(`<div id="XBOX" class="col-xs-6 col-sm-3 row-height">
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
    $.get('https://afternoon-bastion-62299.herokuapp.com/product/switch' , function(data){
      $("#game-list").empty();
      for (var i = 0; i < data.length; i++) {
        $("#game-list").append(`<div id="SWITCH" class="col-xs-6 col-sm-3 row-height">
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

    $.ajax({
      url:"https://afternoon-bastion-62299.herokuapp.com/product/" + id,
      type:"PUT",
      data:{quantity},
      success: function(data){
        alert(Data + "Achtung!!!")
      }


    })
  })

  $("#game-list").on('click', '#addCart',function(){
    var numberPattern = /[+-]?\d+(\.\d+)?/g
    let number;
    let exist = false;
    let title = $(this).prevAll('#title-name').text();
    let platform = $(this).parent().before().attr('id');
    let price = parseFloat($(this).prevAll('#title-price').text().match(numberPattern));
    let url = $(this).prevAll('#title-image').attr('src');

    $.get("https://afternoon-bastion-62299.herokuapp.com/product/cart",function(data){
      for (var i = 0; i < data.length; i++) {
        let id = data[i].id;

         if(data[i].quantity > 0 && data[i].title == title && data[i].platform == platform){
          number = data[i].quantity + 1;
          console.log("SECOND", id);
          $.ajax({
            url:"https://afternoon-bastion-62299.herokuapp.com/product/" + id,
            type:"PUT",
            data:{
              quantity:number
            },
            success: function(data){
              alert(Data + "Achtung!!!")
            }
           })
           exist = true;
          }
      }

      if(!exist){
        console.log("WORKING");
        $.post("https://afternoon-bastion-62299.herokuapp.com/product",
        {
          title:title,
          platform:platform,
          price:price,
          url:url,
          quantity:1
        },
        function(data,status){
          alert("This item has been added to your cart.");
        })
      }

    })
  })

  $("#game-list").on('click', '#deleteItem',function(){

    let id = $(this).parent().parent().before().attr('id')

    $.ajax({
      url:"https://afternoon-bastion-62299.herokuapp.com/product/" + id,
      type: 'DELETE',
      success: function(result)
      {
        console.log("YES!!!");
      }
    })

    $(`#${id}`).fadeOut()
    // window.setTimeout(function(){cartDisplay();},1000);

  })

})

function cartDisplay(){
$.get('https://afternoon-bastion-62299.herokuapp.com/product/cart', function(data){
  $("#game-list").empty();
for (var i = 0; i < data.length; i++) {
  var dynamic = "";
  for (var j = 1; j < 5;j++){
    if(data[i].quantity == j){
      dynamic += `<option selected>${j}</option>`
    }
    else{
      dynamic += `<option>${j}</option>`
    }
  }

  $("#game-list").append(`<div id="${data[i].id}" class="col-xs-6 col-sm-3 cart-box">
    <img id="title-image" src=${data[i].url} class="img-responsive title-image" alt="Generic placeholder thumbnail">
    <h2 id="title-name">${data[i].title}</h2>
    <p id="title-price"> Credit: $ ${data[i].price} </p
    <div class="input-container row">
     <div class="input-box">
      <button type="button" id="deleteItem" class="btn btn-default col-sm-6 col-xs-6" aria-label="Left Align">
        <span class="glyphicon glyphicon-remove" aria-hidden="true">&nbsp;</span>Delete
      </button>
      <form>
        <div class="form-group col-sm-4 col-xs-4">
          <select class="form-control" id="counter">
          ${dynamic}
          </select>
        </div>
      </form>
      </div>
    </div>
  </div>`)
  }
})
}
