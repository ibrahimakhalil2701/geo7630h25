# 🌐 Géoportail Montréal – Visualisation des Données StatCan 2021

![MIT License](https://img.shields.io/badge/License-MIT-green.svg) 
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

**Un tableau de bord interactif pour explorer les données socio-démographiques de Montréal**  


---

## 📚 Table des Matières
- [🌆 Présentation du Projet](#-présentation-du-projet)
- [✨ Fonctionnalités Clés](#-fonctionnalités-clés)
- [🏗 Architecture du Projet](#-architecture-du-projet)
- [📊 Données Utilisées](#-données-utilisées)
- [🌍 Exemples de Sites Inspirants](#-exemples-de-sites-inspirants)
- [🎯 Exemple d’Utilisation](#-exemple-dutilisation)


---

## 🌆 Présentation du Projet
**Géoportail Montréal** est une application web de cartographie interactive permettant d'analyser les données du recensement 2021 de Statistique Canada à l'échelle des arrondissements et aires de diffusion montréalaises.

### Objectifs
- 🎯 Fournir un outil décisionnel aux acteurs publics et chercheurs
- 🔍 Visualiser les disparités socio-économiques (revenu, densité, âge)
- 📈 Favoriser l'engagement citoyen via la transparence des données

---

## ✨ Fonctionnalités Clés
| Fonctionnalité | Description | Technologie |
|----------------|-------------|-------------|
| **🌍 Carte Interactive** | Navigation fluide avec zoom/pan, couches thématiques | Leaflet.js |
| **🔎 Filtres Dynamiques** | Sélection par critères (ex: revenu > 50k) | JavaScript |
| **📊 Visualisations** | Graphiques comparatifs & cartes choroplèthes | Chart.js |
| **🔄 Gestion des Couches** | Activation/désactivation des couches vectorielles | GeoJSON |
| **📌 Infobulles** | Détails socio-démographiques au survol | Leaflet Popups |

---

## 🏗 Architecture du Projet
```bash
geoportail-montreal/
├── public/
│   ├── css/           # Styles personnalisés
│   ├── js/            # Logique cartographique (app.js)
│   └── assets/        # Icônes et images
├── data/              # Jeux de données GeoJSON
│   ├── arrondissements.json
│   └── aires_diffusion.json
├── index.html         # Structure principale
└── README.md          # Documentation



## 🏗 Architecture du Projet

geoportail-montreal/
├── public/
│   ├── css/           # Styles personnalisés
│   ├── js/            # Logique cartographique (app.js)
│   └── assets/        # Icônes et images
├── data/              # Jeux de données GeoJSON
│   ├── arrondissements.json
│   └── aires_diffusion.json
├── index.html         # Structure principale
└── README.md          # Documentation


index.html : Contient la structure de la page (carte, menus, etc.).
app.js : Charge les données GeoJSON, applique les filtres et gère l’interface de la carte.
data/ : Contient les fichiers GeoJSON (ou shapefiles convertis) de StatCan et des arrondissements.
doc/ : Documentation supplémentaire (schémas, explications).
