console.log("Step 1 working");

// Create the 'basemap' tile layer that will be the background of our map.

let basemap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution: '...'
});


// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map


// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [40.7, -94.5],  // Roughly the center of the US
  zoom: 3
});

// Then add the 'basemap' tile layer to the map.
basemap.addTo(map);
// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.


// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.geometry.coordinates[2]), // Color based on depth
        color: "#000000",  // Black border around each circle
        radius: getRadius(feature.properties.mag), // Size based on magnitude
        stroke: true,
        weight: 0.5
    };
}

  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {function getColor(depth) {
    if (depth > 90) return "#ea2c2c";      // Deep red for very deep earthquakes
    else if (depth > 70) return "#ea822c";  // Orange-red
    else if (depth > 50) return "#ee9c00";  // Orange
    else if (depth > 30) return "#eecc00";  // Yellow-orange
    else if (depth > 10) return "#d4ee00";  // Yellow-green
    else return "#98ee00";                  // Light green for shallow earthqua
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {function getRadius(magnitude) {
    // Handle earthquakes with magnitude 0
    if (magnitude === 0) {
        return 1;  // Give them a small but visible size
    }
    return magnitude * 4;  // Scale other magnitudes proportionally

  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {

    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {onEachFeature: function (feature, layer) {
      layer.bindPopup(
          "Magnitude: " + feature.properties.mag +
          "<br>Depth: " + feature.geometry.coordinates[2] +
          "<br>Location: " + feature.properties.place
      );

    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(map);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend


    // Loop through our depth intervals to generate a label with a colored square for each interval.


    return div;
  };

  // Finally, add the legend to the map.


  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.


    // Then add the tectonic_plates layer to the map.

  });
});
