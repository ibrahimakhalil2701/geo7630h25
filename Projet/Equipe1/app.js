// ========================
// Initialisation de la carte MapLibre
// ========================

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/dataviz/style.json?key=JhO9AmIPH59xnAn5GiSj',
  center: [-73.55, 45.55],
  zoom: 9,
  hash: true
});

map.addControl(new maplibregl.NavigationControl({ visualizePitch: true, showCompass: true, showZoom: true }), 'top-left');
map.addControl(new maplibregl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true, showUserHeading: true }), 'top-left');
map.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-right');

// ========================
// Histogramme Chart.js
// ========================

const ctx = document.getElementById('histogram').getContext('2d');
const histogram = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Distribution',
      data: [],
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

// ========================
// Split.js
// ========================

Split(['#map', '#infoPanel'], {
  sizes: [66, 34],
  minSize: [300, 300],
  gutterSize: 8,
  snapOffset: 0
});

// ========================
// Chargement GeoJSON
// ========================

let geojsonData = null;

fetch("https://sturdy-broccoli-g4rr47j5px5wh9964-9000.app.github.dev/collections/MBAI89260004.MBAI89260004_mtl_2021/items?f=json")
  .then(res => res.json())
  .then(data => {
    geojsonData = data;

    map.addSource('statcan2021', {
      type: 'geojson',
      data: geojsonData
    });

    window.updateChoropleth('revenu_median_menage');
  });

// ========================
// Choroplèthe dynamique
// ========================

window.updateChoropleth = function (variable) {
  if (!geojsonData) return;

  if (map.getLayer('statcan-layer')) {
    map.removeLayer('statcan-layer');
  }

  // Nettoyage des valeurs
  geojsonData.features.forEach(f => {
    if (variable === 'densite_population') {
      f.properties.densite_calculee = f.properties.population / f.properties.area_sq_km;
    }
  });

  const values = geojsonData.features.map(f => {
    if (variable === 'densite_population') {
      return f.properties.densite_calculee;
    }
    return f.properties[variable];
  }).filter(v => typeof v === 'number' && !isNaN(v));

  if (values.length === 0) return;

  const breaks = getQuantileBreaks(values, 8);
  const colors = ['#1f3a93', '#4169e1', '#87ceeb', '#d4f1f9', '#ffffcc', '#f4a261', '#e76f51', '#b22222'];

  // Construction de l'expression step valide
  let step = ['step', ['get', variable === 'densite_population' ? 'densite_calculee' : variable], colors[0]];
  for (let i = 0; i < breaks.length; i++) {
    if (typeof breaks[i] === 'number') {
      step.push(breaks[i], colors[i + 1] || colors[i]);
    }
  }

  map.addLayer({
    id: 'statcan-layer',
    type: 'fill',
    source: 'statcan2021',
    paint: {
      'fill-color': '#00ffff',
      'fill-opacity': 0.75,
      'fill-outline-color': '#ccc'
    }
  });

  console.log(variable, values);


  window.updateHistogram(values, breaks);
};

// ========================
// Histogramme dynamique
// ========================

window.updateHistogram = function (values, breaks) {
  const bins = new Array(breaks.length).fill(0);
  values.forEach(v => {
    for (let i = 0; i < breaks.length; i++) {
      if (v <= breaks[i]) {
        bins[i]++;
        break;
      }
    }
  });

  const labels = breaks.map((b, i) => {
    const min = i === 0 ? 0 : breaks[i - 1];
    return `${min.toFixed(0)}–${b.toFixed(0)}`;
  });

  histogram.data.labels = breaks.map((b, i) => {
    const min = i === 0 ? 0 : (breaks[i - 1] ?? 0);
    const max = b ?? 0;
    return `${min.toFixed(0)}–${max.toFixed(0)}`;
  });
  
};

// ========================
// Fonction : quantiles
// ========================

function getQuantileBreaks(values, n = 8) {
  const sorted = [...values].sort((a, b) => a - b);
  const breaks = [];
  for (let i = 1; i <= n; i++) {
    const index = Math.floor((i / n) * sorted.length);
    breaks.push(sorted[index]);
  }

  // Supprimer doublons si existants (important pour 'step')
  return [...new Set(breaks)];
}
