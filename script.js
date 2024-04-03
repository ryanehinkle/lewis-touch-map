var map = L.map('map', {
    minZoom: 2, // Set the minimum zoom level
    maxZoom: 5, // Set the maximum zoom level
  }).setView([0, 0], 1); // Set initial view
  
  // Load and add the custom image overlay as the map
  var imageUrl = 'map.svg';
  var imageBounds = [[-90, -180], [90, 180]]; // Set the bounds of the image (latitude/longitude)
  L.imageOverlay(imageUrl, imageBounds).addTo(map);
  
  // Set the map boundaries
  map.setMaxBounds(imageBounds);
  map.on('drag', function() {
    map.panInsideBounds(imageBounds, { animate: false });
  });
  
  // Info to display for AS Building pin
  const ASInfo = `
  Academic Science
  Center (AS) 12
  LOWER FLOOR
  • Physics
  • Greenhouse
  GROUND FLOOR
  • Chemistry
  • Engineering, Computing
  and Mathematical
  Sciences
  • Cadaver Lab
  • Likens Virtual Reality Lab
  • Dean, Aviation, Science
  and Technology
  • Charlie’s Place
  UPPER FLOOR
  • Biology
  `;
  
  // Define locations of info markers (lat/long)
  var markerLocations = [
      { latlng: [37, 1], info: '<b>' + ASInfo + '</b>', icon: L.divIcon({ className: 'custom-marker' }) },
      // Add more here
  ];
  
  // Add the markers to the map with custom icons and info boxes
  markerLocations.forEach(function(marker) {
      L.marker(marker.latlng, { icon: marker.icon })
      .bindPopup(marker.info)
      .addTo(map);
  });
  
  // Display the cursor's current coordinates (for testing)
  map.on('mousemove', function(e) {
    var coordinatesElement = document.getElementById('coordinates');
    if (coordinatesElement) {
      coordinatesElement.textContent = e.latlng.lat.toFixed(4) + ', ' + e.latlng.lng.toFixed(4);
    }
  });
  
  // Get all the dropdown menu options
  var options = document.querySelectorAll('.dropdown-content a');
  
  // Loop through each option and listen for click event
  options.forEach(function(option) {
    option.addEventListener('click', function(event) {
      // Prevent default link behavior
      event.preventDefault();
      // Get the href attribute of the clicked menu option
      var href = option.getAttribute('href');
      // Navigate to that HTML file
      window.location.href = href;
    });
  });
  