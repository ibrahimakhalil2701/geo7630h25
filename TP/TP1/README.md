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



## 📊 Données Utilisées Sources Officielles

- **Statistique Canada 2021**  
  Données socio-démographiques des aires de diffusion (DAUID).

- **Données ouvertes Montréal**  
  Limites administratives des arrondissements (Shapefile).

**Traitement des Données :**  
- **Conversion :** Shapefile → GeoJSON via QGIS.  
- **Nettoyage :** Validation des géométries avec FME.  
- **Optimisation :** Simplification topologique avec Mapshaper.

> **Lien des données :** [Accéder aux données](https://drive.google.com/drive/u/0/folders/159cZmz_XU4CxS5tfzuFcpOks9_qQNcCA)

---

## 🌍 Exemples de Sites Inspirants

- **Census Mapper**  
  *Cartographie avancée des données de recensement canadiennes*  
  **Inspiration clé :** Système de filtres multicritères.

- **Données Ouvertes Montréal**  
  *Exemple concret : Carte des arbres publics*  
  **Fonctionnalité répliquée :** Légende interactive avec basculement de couches.

- **Social Explorer**  
  *Bonnes pratiques : Comparaisons temporelles (2016 vs 2021)*  
  **Technologie adaptée :** Visualisations D3.js.

---

## Exemple d’Utilisation

- **Sélection de la couche “Aires de diffusion” :**  
  Activez le calque via le menu latéral.

- **Filtre sur le revenu médian :**  
  Ajustez le curseur “Revenu médian” pour n’afficher que les DAUID où le revenu est supérieur à 40 000 $.

- **Comparaison multi-arrondissements :**  
  Cliquez sur plusieurs polygones pour voir les pop-ups et comparer la population, la densité, etc.






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
