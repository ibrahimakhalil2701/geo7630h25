markdown
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
Ce laboratoire permet de maîtriser :
- 🎯 Modification de coordonnées et niveau de zoom
- 🎨 Personnalisation de couleurs de polygones
- 🌈 Génération de couleurs aléatoires
- 🗺 Symbologie thématique par attribut
- 🔤 Ajout d'étiquettes dynamiques
- 📌 Gestion de version avec Git/GitHub

---

## 🚀 Mise en œuvre

### 1. Configuration initiale
```bash
git clone https://github.com/Captain-Oski/GEO7630_H25
cd GEO7630_H25
git checkout -b votrepseudo-labo9
2. Modification des coordonnées
Fichier : lab9.js

javascript
// Avant
center: [-73.55, 45.55], 
zoom: 10

// Après
center: [-73.60, 45.50], // Nouveau centre
zoom: 12 // Zoom renforcé
Résultat : Carte centrée sur Montréal

3. Personnalisation des couleurs
Fichier : lab9.js

javascript
// Modification de la couleur fixe
function colorPolygons() {
  map.setPaintProperty('garages-layer', 'fill-color', '#9f40ff');
}
Avant/Après : Comparaison des couleurs

4. Génération de couleurs aléatoires
Fichier : randomColor.js

javascript
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}
Intégration :

html
<!-- Ajout dans index.html -->
<script src='./randomColor.js'></script>
Résultat : Couleurs aléatoires générées

5. Symbologie thématique
Fichier : lab9.js

javascript
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
Résultat : Carte thématique basée sur l'attribut

6. Étiquettes dynamiques
Ajout dans lab9.js :

javascript
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
Résultat : Étiquettes dynamiques des opérateurs affichées

🔄 Gestion de version GitHub
bash
git add .
git commit -m "Labo9: Coordonnées, couleurs dynamiques, étiquettes"
git push origin votrepseudo-labo9
📂 Structure du projet
plaintext
GEO7630_H25/
├── index.html
├── lab9.js
├── randomColor.js
├── data/
│   └── garages.geojson
└── screenshots/
    ├── coord-modifiees.jpg
    ├── couleurs-aleatoires.gif
    └── thematique-operator.jpg
🏆 Bilan technique
Compétence	Technologies	Résultat
Manipulation cartographique	MapLibreGL	✅
Génération algorithmique	JavaScript	✅
Gestion de styles	CSS/JSON	✅
Versionnement	Git/GitHub	✅
➡️ Prochaines étapes
Intégrer des popups interactives

Ajouter un sélecteur de couches

Implémenter une recherche spatiale