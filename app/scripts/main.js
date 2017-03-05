function hideShowView(evt){
  var eventTarget = $(evt.target);
  var data = eventTarget.data();
  $('.view').removeClass('active');
  $(data.target).addClass('active');

  renderTemplate(data.target, data.item);
  
}




$('body').on('click', '.view-switcher', function(evt){
  hideShowView(evt);
});


if (Modernizr.localstorage) {
  var beers = [
    {
      "id": "1",
      "title": "Pliny the Elder",
      "description": "Good!",
      "image": null,
      "location": { "latitude": 37, "longitude": 122 }
    },
    {
      "id": "2",
      "title": "Pliny the Younger",
      "description": "Great!",
      "image": null,
      "location": { "latitude": 37, "longitude": 152 }
    },
    {
      "id": "3",
      "title": "Racer 5",
      "description": "Reliable!",
      "image": null,
      "location": { "latitude": 99, "longitude": 300 }
    }
  ];


  localStorage.beers = JSON.stringify(beers);
}
else {
  console.log('does not work');
}

var renderTemplate = function(target, itemId){
  var targetTemplate = $(target+'-template');
  var source = $(targetTemplate).html();
  var template = Handlebars.compile(source);

  var data;
  if(itemId){
    var arr = $.grep( beers, function(beer,i){
      return beer.id == itemId;
    });

    data = arr[0];
  } else {
    data = { beers: beers};
  }

  var html = template(data);
  $(target).html(html);
}

renderTemplate('#full-list');