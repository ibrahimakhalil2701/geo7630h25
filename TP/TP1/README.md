# 🌐 Géoportail Montréal – Visualisation des Données StatCan 2021

![MIT License](https://img.shields.io/badge/License-MIT-green.svg) 
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

**Un tableau de bord interactif pour explorer les données socio-démographiques de Montréal**  
*Powered by Leaflet/Mapbox | Data: Statistics Canada 2021*

---

## 📚 Table des Matières
- [🌆 Présentation du Projet](#-présentation-du-projet)
- [✨ Fonctionnalités Clés](#-fonctionnalités-clés)
- [🏗 Architecture du Projet](#-architecture-du-projet)
- [📊 Données Utilisées](#-données-utilisées)
- [🛠 Installation & Démarrage](#-installation--démarrage)
- [🎯 Exemple d’Utilisation](#-exemple-dutilisation)
- [🖼 Captures d’Écran](#-captures-décran)
- [🗺 Feuille de Route](#-feuille-de-route)
- [👥 Contributeurs](#-contributeurs)
- [📜 Licence](#-licence)

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
