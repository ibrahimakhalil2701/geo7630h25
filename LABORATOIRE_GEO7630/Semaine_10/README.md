# 🛰️ Laboratoire 10 - GEO7630H25

## Configuration de GeoServer et mise en place de services VTS et WFS

---

## ✅ Étape 1 : Lancement d'une instance GeoServer

Lancer un **Codespace** à partir de votre **fork GitHub** du dépôt du cours (branche `main`). Cela active un environnement où l’on peut tester du code et démarrer les services cartographiques.

---

## 🛠️ Étape 2 : Configuration de l'environnement

1. Copier `.env.example` (dans `Atlas/`) → Renommer en `.env`
2. Modifier les variables comme suit :
```env
DB_USER=CODEPERMANENT
DB_PASSWORD=VOTREMOTDEPASSE
DB_HOST=geo7630h25.cvwywmuc8u6v.us-east-1.rds.amazonaws.com
DB_NAME=geo7630
```
3. Dans le dossier `Atlas`, clic droit sur `docker-compose.yml` > **Compose Up**
4. Si l’option n’apparaît pas : installer l’extension **Docker** (`Ctrl+Shift+X > Docker`)



📸 *Capture du processus
  ![Processu](photo/1.png)
  ![Processu](photo/2.png)
  ![Processu](photo/3.png)
  ![Processu](photo/4.png)
  ![Processu](photo/5.png)
  ![Processu](photo/6.png)


---

## ⚙️ Étape 3 : Ajout de contrôles de carte dans après l'avoir declarée `app.js`

```js
var nav = new maplibregl.NavigationControl({
  showCompass: true,
  showZoom: true,
  visualizePitch: true
});
map.addControl(nav, 'top-right');

var geolocateControl = new maplibregl.GeolocateControl({
  positionOptions: { enableHighAccuracy: true },
  trackUserLocation: true
});
map.addControl(geolocateControl, 'bottom-right');

var scale = new maplibregl.ScaleControl({ unit: 'metric' });
map.addControl(scale);
```

[Documentation officielle des contrôles MapLibre](https://maplibre.org/maplibre-gl-js/docs/API/#markers-and-controls)

📸 *Capture du processus
  ![Processu](photo/7.png)
  ![Processu](photo/8.png)
  ![Processu](photo/9.png)
  ![Processu](photo/10.png)

---

## 🗂️ Étape 4 : Intégration de tuiles vectorielles (VTS)

1. Trouver l'URL d'un service dans `pg_tileserv` (format `{z}/{x}/{y}.pbf`)
2. Vérifier le bon `source-layer` depuis le JSON du service
3. Exemple de code à insérer dans `app.js` :

```js
map.on('load', function () {
  map.addSource('qt_arbres_quartier_source', {
    type: 'vector',
    tiles: ['https://special-train-gv4r9g5gj4cvp7-8801.app.github.dev/public.densite_arbres_quartiers/{z}/{x}/{y}.pbf']
  });
  map.addLayer({
    id: 'qt_arbres_quartier',
    type: 'fill',
    source: 'qt_arbres_quartier_source',
    'source-layer': 'public.densite_arbres_quartiers'
  });
});
```

📸 *Capture du processus
  ![Processu](photo/11.png)
  ![Processu](photo/12.png)
  ![Processu](photo/13.png)
  ![Processu](photo/14.png)

---

## 🎨 Étape 5 : Stylisation simple

```js
paint: {
  'fill-color': '#FF0000',
  'fill-opacity': 0.5
}
```

---

## 🌈 Étape 6 : Style avancé avec interpolation

```js
paint: {
  'fill-color': [
    'interpolate',
    ['linear'],
    ['get', 'qt_arbres'],
    0, 'rgb(255, 255, 255)',
    100, 'rgba(192, 192, 255, 0.64)',
    1000, 'rgba(46, 46, 255, 0.58)',
    5000, 'rgba(68, 0, 255, 0.66)',
    7000, 'rgba(19, 0, 70, 0.66)'
  ],
  'fill-opacity': 0.7
}
```

---

## 🌐 Étape 7 : Ajout d'une couche WFS avec `pg_featureserv`

1. Charger les **arrondissements** dans PostGIS (ex. via FME)

📸 *Capture du processus
  ![Processu](photo/15.png)
  ![Processu](photo/16.png)
  ![Processu](photo/17.png)
 

2. Rendre le port `9000` public
3. Ajouter ce code dans `app.js` :

```js
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function loadWFS() {
  map.addSource('arrondissements-source', {
    type: 'geojson',
    data: 'https://special-train-gv4r9g5gj4cvp7-9000.app.github.dev/collections/public.arrondissements/items?limit=5000'
  });

  map.addLayer({
    id: 'arrondissements',
    type: 'fill',
    source: 'arrondissements-source',
    paint: {
      'fill-outline-color': 'black',
      'fill-color': getRandomColor(),
      'fill-opacity': 0.3
    },
    before: 'qt_arbres_quartier'
  });
}
```

4. Ajouter un bouton HTML dans votre fichier :
```html
<div class='map-overlay top'>
  <button type="button" class="btn btn-primary" onclick="loadWFS()">Load WFS Data</button>
</div>
```


📸 *Capture du processus
  ![Processu](photo/18.png)
  
---

## ✅ Résultat attendu

- Carte MapLibre avec :
  - Tuiles vectorielles personnalisées
  - Couche WFS dynamique
  - Contrôles d’interaction utilisateur

📸 *Capture du processus
  ![Processu](photo/19.png)


---

## 📌 À venir

- Filtres dynamiques
- Déplacement automatisé (zoom/ciblage)
- Popups et interactions de souris
- Visualisations thématiques et avancées

---

> _Ce projet permet de connecter MapLibre à des services GeoServer modernes (pg_tileserv et pg_featureserv) pour créer une carte dynamique, interactive et riche en données._