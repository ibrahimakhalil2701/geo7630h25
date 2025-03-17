# 🛰 Laboratoire 9 : Webmapping Open Source avec MapLibreGL

**Développé par [Votre Nom]**  
*Date de réalisation : [Date]*

---

## 🛠 Prérequis
- ✅ Visual Studio installé et configuré
- ✅ Compte GitHub connecté à Visual Studio
- 🌐 Navigateur Web moderne (Chrome/Firefox/Edge)

---

## 📋 Objectifs
Ce laboratoire vous permettra de maîtriser :
- 🎯 Modification de coordonnées et niveau de zoom
- 🎨 Personnalisation des couleurs de polygones
- 🌈 Génération de couleurs aléatoires
- 🗺 Symbologie thématique par attribut
- 🔤 Ajout d'étiquettes dynamiques
- 📌 Gestion de version avec Git/GitHub

---

## 🚀 Mise en œuvre

```bash
# Étape 1 : Configuration initiale
git clone https://github.com/Captain-Oski/GEO7630_H25
cd GEO7630_H25
git checkout -b votrepseudo-labo9

# Étape 2 : Modification des coordonnées
# Fichier : lab9.js

# Avant modification :
center: [-73.55, 45.55], 
zoom: 10

# Après modification :
center: [-73.60, 45.50], # Nouveau centre
zoom: 12 # Zoom renforcé

# Résultat : La carte est maintenant centrée sur Montréal.

# Étape 3 : Personnalisation des couleurs
# Fichier : lab9.js
function colorPolygons() {
  map.setPaintProperty('garages-layer', 'fill-color', '#9f40ff');
}
# Résultat : Une comparaison des couleurs montre le changement effectué.

# Étape 4 : Génération de couleurs aléatoires
# Fichier : randomColor.js
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

# Intégration dans index.html
<script src='./randomColor.js'></script>

# Résultat : Les couleurs générées aléatoirement s'affichent sur la carte.

# Étape 5 : Symbologie thématique
# Fichier : lab9.js
map.setPaintProperty('garages-layer', 'fill-color', {
  property: 'operator_id',
  stops: [
    [2, randomColor()],
    [3, randomColor()],
    [15, randomColor()],
    [20, randomColor()],
    [25, randomColor()],
    [30, randomColor()]
  ]
});
# Résultat : Les polygones sont colorés en fonction de l'attribut operator_id.

# Étape 6 : Ajout d'étiquettes dynamiques
# Fichier : lab9.js
map.addLayer({
  'id': 'geojson-label',
  'type': 'symbol',
  'source': 'geojson-source',
  'layout': {
    'text-field': ['get', 'operator_id']
  },
  'paint': {
    'text-color': '#202',
    'text-halo-width': 2
  }
});
# Résultat : Les étiquettes sont ajoutées dynamiquement sur la carte.
