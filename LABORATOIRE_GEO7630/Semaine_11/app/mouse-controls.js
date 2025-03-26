// mouse-controls.js

// Curseur dynamique sur les commerces
map.on('mouseenter', 'commerces', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'commerces', () => {
    map.getCanvas().style.cursor = '';
  });
  
  // Clic : popup + flyTo
  map.on('click', 'commerces', (e) => {
    const props = e.features[0].properties;
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(`<strong>Le nom du commerce est : ${props.nom}</strong><br>Type : ${props.type}`)
      .addTo(map);
  
    map.flyTo({
      center: e.lngLat,
      zoom: 14
    });
  });
  