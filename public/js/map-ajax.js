$(function() {

  var map;
  var tennisCourts = [];
  var googleMarkers = [];
  var googleInfoWindow = [];

  var SeattleCourt = function(name, options) {
    this.name = name;
    this.latitude = options.latitude;
    this.longitude = options.longitude;
    this.address = options.address;
    this.website = options.website;
  };

  $.ajax({
    type: "GET",
    url:  "https://data.seattle.gov/resource/7stk-8j8w.json",
    dataType: 'json',
    success: function compile (data) {
      for(var i = 0; i < data.length; i++) {
        tennisCourts.push(new SeattleCourt(data[i].common_name, {
          latitude : parseFloat(data[i].latitude),
          longitude : parseFloat(data[i].longitude),
          address : data[i].address,
          website : data[i].website.url
        }));
      }
      console.log(data);
      console.log(tennisCourts);

    },
    complete: function initialize() {
      map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 11,
        center: {
          lat: 47.6297,
          lng: -122.3331
        },
        scrollwheel: false,
        minZoom: 11
      });

      function makeMarkers() {
        for(var i = 0; i < tennisCourts.length; i++) {
          googleMarkers.push([tennisCourts[i].name, tennisCourts[i].latitude, tennisCourts[i].longitude]);

          googleInfoWindow.push(['<div class="map_marker">'+
            '<h2>' + tennisCourts[i].name + '</h2>'+
            '<p>' + tennisCourts[i].address + '</p>' +
            // '<p>More Info:</p> ' +
            '<p><a href="' + tennisCourts[i].website + '" target="_blank">Court Website</a></p>' +
            '<p><a href="people.html">Invite A Player</a></p>' +
            '</div>']);
        }
      }

      makeMarkers();

      console.log(googleMarkers);
      console.log(googleInfoWindow);

      for(var i = 0; i < googleMarkers.length; i++ ) {
        var position = new google.maps.LatLng(googleMarkers[i][1], googleMarkers[i][2]);
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            // animation: google.maps.Animation.BOUNCE,
            icon: 'images/map-icon.png',
            title: googleMarkers[i][0]
        });

        var infoWindow = new google.maps.InfoWindow()

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infoWindow.setContent(googleInfoWindow[i][0]);
            infoWindow.open(map, marker);
          }
        })(marker, i));

      }

      google.maps.event.addDomListener(window, 'load', initialize);

    }
  });

});


