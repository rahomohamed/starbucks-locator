var map;
var markers = [];
var infoWindow;

function initMap() {
  var toronto = {
    lat: 43.648161,
    lng: -79.383075,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: toronto,
    zoom: 11,
    styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ff9ebe"
            },
            {
              "saturation": -65
            },
            {
              "lightness": 15
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]

  });
  infoWindow = new google.maps.InfoWindow();
  displayStores();
  showStoresMarkers();
  setOnClickListener();
}

function setOnClickListener() {
  var storeElements = document.querySelectorAll('.store-container');
  storeElements.forEach(function(elem, index){
      elem.addEventListener('click', function(){
          google.maps.event.trigger(markers[index], 'click');
      })
  });
}

function displayStores() {
  var storesHtml = "";
  stores.forEach(function (store, index) {
    var address = store.address;
    var phone = store.phoneNumber;
    storesHtml += `  <div class="store-container">
    <div class="store-container-background">
    <div class="store-info-container">
        <div class="store-address">
            <span>${address.streetAddressLine1}</span>
            <span>${address.city}, ${address.countrySubdivisionCode} ${address.postalCode}</span>
        </div>
        <div class="store-phone-number">${phone}</div>
    </div>
    <div class="store-number-container">
        <div class="store-number">
            ${index+1}
        </div>
    </div>
</div>
</div>`;
  });
  document.querySelector(".stores-list").innerHTML = storesHtml;
}

function showStoresMarkers() {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function (store, index) {
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude);
var name = store.name;
var address = store.address.streetAddressLine1;
var statusText = store.openStatusText;
var phone = store.phoneNumber;
bounds.extend(latlng);
createMarker(latlng, name, address, statusText, phone, index);
})
map.fitBounds(bounds);
}

function createMarker(latlng, name, address, statusText, phone, index) {
  var html = `
  <div class="store-info-window">
  <div class="store-info-name">
  ${name}
  </div>
  <div class="store-info-status">
  Open Until 6pm
  </div>
  <div class="store-info-address">
  <div class="circle">
  <i class="fas fa-location-arrow"></i>
  </div>
  ${address}
  </div>
  <div class="store-info-phone">
  <div class="store-info-phone">
  <div class="circle">
      <i class="fas fa-phone-alt"></i>
  </div>
  ${phone}
  </div>
  </div>
  `;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: `${index+1}`
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
} 

