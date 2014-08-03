

var geocoder;
var map;
var marker;

function initializeAdd() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(25.27113, 55.307485);
  var mapOptions = {
    zoom: 10,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
   $("#myConfirm").on("shown.bs.modal", function(e) {
    google.maps.event.trigger(map, "resize");
    return map.setCenter(latlng); // Set here center map coordinates
  });
}

function initializeEdit(lat,lng) {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(lat,lng);
  var mapOptions = {
    zoom: 10,
    center: latlng
  }

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  map.setCenter(latlng);

  marker = new google.maps.Marker({
      position: latlng,
      map: map,
      draggable:true,
      animation: google.maps.Animation.DROP,
      position: latlng
  });

  google.maps.event.addListener(marker, 'dragend', function() {
          geocodePosition(marker.getPosition());
  });
  
   $("#myConfirm").on("shown.bs.modal", function(e) {
    google.maps.event.trigger(map, "resize");
    return map.setCenter(latlng); // Set here center map coordinates
  });

}


function codeAddress() {
  if(marker!=undefined) {
     marker.setMap(null);
  }
  
  var city = $("#city_select option:selected").text();
  var address = document.getElementById('place_name').value;
   var comp_address = address+" "+city;
  geocoder.geocode( { 'address': comp_address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      $('#place_lat').val(lat);
      $('#place_long').val(lng);
        marker = new google.maps.Marker({
          map: map,
          draggable:true,
          animation: google.maps.Animation.DROP,
          position: results[0].geometry.location
      });
      google.maps.event.addListener(marker, 'dragend', function() 
      {
          geocodePosition(marker.getPosition());
      });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


function codeSubAddress() {
  if(marker!=undefined) {
     marker.setMap(null);
  }
  
  var city = $("#city_select option:selected").text();
  var address = document.getElementById('place_name').value;
  var location = $("#location_select option:selected").text();
  var comp_address = address+" "+location+" "+city;
  geocoder.geocode( { 'address': comp_address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      $('#place_lat').val(lat);
      $('#place_long').val(lng);
        marker = new google.maps.Marker({
          map: map,
          draggable:true,
          animation: google.maps.Animation.DROP,
          position: results[0].geometry.location
      });
      google.maps.event.addListener(marker, 'dragend', function() 
      {
          geocodePosition(marker.getPosition());
      });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function geocodePosition(pos) 
{
   geocoder = new google.maps.Geocoder();
   geocoder.geocode
    ({
        latLng: pos
    }, 
        function(results, status) 
        {
            if (status == google.maps.GeocoderStatus.OK) 
            {
                $("#place_lat").val(results[0].geometry.location.lat());
                $("#place_long").val(results[0].geometry.location.lng());
            } 
            else 
            {
                return false;
            }
        }
    );
}
