# Processus de traitement des données avec FME

Ce projet consiste à traiter des données géospatiales et statistiques pour produire des résultats exploitables. Les étapes suivantes décrivent le flux de travail réalisé dans FME (Feature Manipulation Engine).

---

## Étape 1 : Chargement des données

### Sources de données
- 🗺 **`limites-administratives-agglomeration-nad83.geojson`**  
  Fichier GeoJSON des limites administratives (NAD83).  
  ![Chargement GeoJSON](TP2/photo/1.png)
  ![Chargement GeoJSON](TP2/photo/2.png)

- 📊 **`stat_can2021_recensement.csv`**  
  Données de recensement 2021 de Statistique Canada.  
  ![Chargement CSV](TP2/photo/3.png)
  ![Chargement CSV](TP2/photo/4.png)

- 🔷 **`decoup.shp`**  
  Shapefile des aires de diffusion (DA).  
  ![Chargement Shapefile](TP2/photo/5.png)


### Connexion des sources
Les données sont chargées et dirigées vers l'étape de **Reprojection (EPSG:3857)**.

---

## Étape 2 : Transformations

### 🔄 Reprojection (NAD83 → Web Mercator)
- **Reprojector**  
  Les données géospatiales sont reprojetées du système de coordonnées NAD83 vers Web Mercator (EPSG:3857), une projection couramment utilisée pour les applications web cartographiques.

### 🔗 Jointure DAUID
- **FeatureJoiner**  
  Une jointure interne (Inner Join) est effectuée entre les données géospatiales (DAUID) et les données statistiques du fichier CSV. La clé de jointure est l'identifiant DAUID.

### 🧹 Nettoyage des données
1. **NullAttributeMapper**  
   Les valeurs nulles (NULL) sont remplacées par des zéros (0) pour éviter les erreurs de calcul.

2. **AttributeManager**  
   Les attributs sont renommés pour une meilleure lisibilité (exemple : `revenu_median`).

3. **Logger**  
   Un suivi des erreurs est mis en place pour identifier les problèmes potentiels dans les données.

### 🗺 Jointure Spatiale
- **SpatialFilter**  
  Une jointure spatiale est effectuée pour filtrer les données en fonction de leur intersection avec les limites des arrondissements.

---

## Étape 3 : Calculs

### Calculs des indicateurs
1. **StatisticsCalculator**  
   La somme de la population est calculée pour chaque aire de diffusion.

2. **AreaCalculator**  
   La superficie de chaque aire de diffusion est calculée en mètres carrés (m²).

3. **AttributeManager**  
   La densité de population est calculée avec la formule :  
   `Densité = (Population / Superficie) * 10⁶`.

---

## Étape 4 : Export des résultats

Les données traitées sont exportées dans trois formats différents pour une utilisation ultérieure :

1. 🐘 **PostGIS Writer**  
   Les données sont stockées dans une table PostgreSQL/PostGIS nommée `recensement_montreal_2021`.

2. 🌐 **GeoJSON Writer**  
   Les données sont exportées au format GeoJSON dans le fichier `output/recensement_mtl.geojson`.

3. 🗂️ **Shapefile Writer**  
   Les données sont exportées au format Shapefile dans le dossier `output/recensement_mtl.shp`.

---

## Résultat final
Le processus génère des données géospatiales et statistiques nettoyées, enrichies et prêtes à être utilisées dans des analyses ou des visualisations cartographiques.
