// Carte MapLibre
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/dataviz/style.json?key=JhO9AmIPH59xnAn5GiSj',
    center: [-73.55, 45.55],
    zoom: 9,
    hash: true
  });
  
  map.addControl(new maplibregl.NavigationControl({
    visualizePitch: true,
    showCompass: true,
    showZoom: true
  }), 'top-left');
  
  map.addControl(new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
    showUserHeading: true
  }), 'top-left');

  
  map.addControl(new maplibregl.ScaleControl({
    maxWidth: 100,
    unit: 'metric'
  }), 'bottom-right');
  


  // Histogramme Chart.js (données fictives à remplacer)
  const ctx = document.getElementById('histogram').getContext('2d');
  const histogram = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
      datasets: [{
        label: 'Distribution',
        data: [3, 5, 7, 8, 10, 12, 10, 8, 6, 4, 2],
        backgroundColor: '#f87171'
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { display: true },
        y: { display: false }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
  

  Split(['#map', '#infoPanel'], {
    sizes: [66, 34],         // pourcentage initial de largeur (carte/panneau)
    minSize: [300, 300],     // taille minimum de chaque côté
    gutterSize: 8,           // largeur du séparateur
    snapOffset: 0
  });
  