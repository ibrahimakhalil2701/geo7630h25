// app.js

// Ajoute les sources et couches dans la carte une fois qu'elle est prête
map.on('load', function () {
    // Commerces
    map.addSource('commerces_source', commercesSource);
    map.addLayer(commercesLayer);
  
    // Arrondissements
    map.addSource('arrondissements_source', arrondissementsSource);
    map.addLayer(arrondissementsLayer);
    map.addLayer(arrondissementsLabelsLayer);
  });
  