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
              <button type="button" id="cart" class="btn btn-default" aria-label="Left Align">
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
        <button type="button" id="cart" class="btn btn-default" aria-label="Left Align">
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
          <button type="button" id="cart" class="btn btn-default" aria-label="Left Align">
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
          <button type="button" id="cart" class="btn btn-default" aria-label="Left Align">
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
          <button type="button" id="cart" class="btn btn-default" aria-label="Left Align">
            <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">&nbsp;</span>Add Cart
          </button>
        </div>`)
      }
    })
  })

  $("#game-list").on('click', '#cart',function(){
    var numberPattern = /[+-]?\d+(\.\d+)?/g
    var prices = $(this).prevAll('#title-price').text().match(numberPattern)

    $.post("https://afternoon-bastion-62299.herokuapp.com/product",
    {
      title:$(this).prevAll('#title-name').text(),
      platform:$(this).parent().before().attr('id'),
      price:parseFloat(prices),
      url:$(this).prevAll('#title-image').attr('src')
    },
    function(data,status){
      alert("Data: " + data + "\nStatus: " + status);
    })
  })

})
