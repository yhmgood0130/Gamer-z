const loading = document.querySelector('.loading');

$(document).ready(function() {

  $.get('https://afternoon-bastion-62299.herokuapp.com/product', function(data){
    $("#search").keypress(function(event) {
      let name;
      if ((event.keyCode == 13) && (event.target.type != "textarea")) {
        event.preventDefault();
        $("#game-list").empty();
        name = $("#title-name").val()
        console.log(data[0].title.match(new RegExp(name,"i")));
        for (var i = 0; i < data.length; i++) {
          if(data[i].title.match(new RegExp(name,"i")))
            $("#game-list").append(`<div class="col-xs-6 col-sm-3 ">
              <img src=${data[i].url}  class="img-responsive title-image" alt="Generic placeholder thumbnail">
              <h2>${data[i].title}</h2>
              <p> Credit: $ ${data[i].price} </p>
            </div>`)
        }
        // $(this).submit();
      }
    })
  });

  $('#all').click(function(){
    $.get('https://afternoon-bastion-62299.herokuapp.com/product', function(data){
      console.log(data);
      $("#game-list").empty();
      for (var i = 0; i < data.length; i++) {
          $("#game-list").append(`<div class="col-xs-6 col-sm-3 ">
            <img src=${data[i].url}  class="img-responsive title-image" alt="Generic placeholder thumbnail">
            <h2>${data[i].title}</h2>
            <p> Credit: $ ${data[i].price} </p>
          </div>`)
      }
    })
  })

  $('#PS4').click(function(){
    $.get('https://afternoon-bastion-62299.herokuapp.com/product/ps4', function(data){
      console.log(data);
      $("#game-list").empty();
      for (var i = 0; i < data.length; i++) {
        if(data[i].platform == "PS4")
        {
          $("#game-list").append(`<div class="col-xs-6 col-sm-3 ">
            <img src= ${data[i].url} class="img-responsive title-image" alt="Generic placeholder thumbnail">
            <h2> ${data[i].title} </h2>
            <p> Credit: $ ${data[i].price} </p>
          </div>`)
        }
      }
    })
  })

  $('#XBOX').click(function(){
    $.get('https://afternoon-bastion-62299.herokuapp.com/product/xbox', function(data){
      console.log(data);
      $("#game-list").empty();
      for (var i = 0; i < data.length; i++) {
        if(data[i].platform == "XBOX ONE")
        {
          $("#game-list").append(`<div class="col-xs-6 col-sm-3 ">
            <img src= ${data[i].url} class="img-responsive title-image" alt="Generic placeholder thumbnail">
            <h2> ${data[i].title} </h2>
            <p> Credit: $ ${data[i].price} </p>
          </div>`)
        }
      }
    })
  })

  $('#SWITCH').click(function(){
    let itemName;
    $.get('https://afternoon-bastion-62299.herokuapp.com/product/switch' , function(data){
      console.log(data);
      $("#game-list").empty();
      for (var i = 0; i < data.length; i++) {
        if(data[i].platform == "Switch")
        {
          $("#game-list").append(`<div class="col-xs-6 col-sm-3 ">
            <img src= ${data[i].url} class="img-responsive title-image" alt="Generic placeholder thumbnail">
            <h2> ${data[i].title} </h2>
            <p> Credit: $ ${data[i].price} </p>
          </div>`)
        }
      }
    })
  })


// <span class="text-muted">Something else</span>

})
