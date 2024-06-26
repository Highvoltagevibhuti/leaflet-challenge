// // Creating the map object
// // Step 1: Create the L.map object
// // Step 2: Loading the tile layer
// let myMap = L.map("map", {
//     center : [37.0902, -95.7129], // coordinates for USA
//     zoom : 4
// });

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);


// // from USGS geoJSON feed use past 7 days all earthquakes url to get geoJSON data
// let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Load the data
// d3.json(url).then (function (data){
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data).addTo(myMap);
// });


// snippet from Riana and modification
// from USGS geoJSON feed use past 7 days all earthquakes url to get geoJSON data
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p> ${feature.properties.mag}`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,

    // point to layer for the circule coordinates
    pointToLayer: function(features, coordinates) {
        let depth = features.properties.mag;
        let geoMarkers = {
            radius: depth * 5,
            fillColor: markerColor(depth),
            fillOpacity: 0.7,
            weight: 0.5
          };

            function markerColor(depth){
              if (depth < 10) return "#00FF00";
              else if (depth < 30) return "greenyellow";
              else if (depth < 50) return "yellow";
              else if (depth < 70) return "orange";
              else if (depth < 90) return "orangered";
              else return "#FF0000";
            };
            
       
        return L.circleMarker(coordinates, geoMarkers);

        
  
    }
  });


  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


//Adding legend
  var legend = L.control({position: 'bottomleft'});
  legend.onAdd = function (myMap) {

  var div = L.DomUtil.create('div', 'info legend');
  labels = ['<strong>Categories</strong>'],
  categories = ['Road Surface','Signage','Line Markings','Roadside Hazards','Other'];

  for (var i = 0; i < categories.length; i++) {

          div.innerHTML += 
          labels.push(
              '<i class="circle" style="background:' + markerColor(categories[i]) + '"></i> ' +
          (categories[i] ? categories[i] : '+'));

      }
      div.innerHTML = labels.join('<br>');
  return div;
  };

  legend.addTo(myMap);

  function Colorscale(depth) {

    // variable to hold the color
    let color = "";

    if (depth <= 1) {
        return color = "#ffa500";
    }
    else if (depth <= 2) {
        return color = "#cd8500";
    }
    else if (depth <= 3) {
        return color = "#e3a857";
    }
    else if (depth <= 4) {
        return color = "#cd5c5c";
    }
    else if (depth <= 5) {
        return color = "#ee2c2c";
    }
    else {
        return color = "#8b1a1a";
    }
  }};
