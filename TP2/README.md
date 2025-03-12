# Processus de traitement des données avec FME

Ce projet consiste à traiter des données géospatiales et statistiques pour produire des résultats exploitables. Les étapes suivantes décrivent le flux de travail réalisé dans FME (Feature Manipulation Engine).

---




## 🛠️ Le schéma explicatif
- ## 📊 Schéma du Processus de Données

Voici le schéma expliquant le flux de travail utilisé dans ce projet :

![Schéma du Processus](image/schema.png)



## Étape 1 : Chargement des données

### Sources de données
- 🗺 **`limites-administratives-agglomeration-nad83.geojson`**  
  Fichier GeoJSON des limites administratives (NAD83).  
  ![Chargement GeoJSON](image/image1.png) 
  ![Chargement GeoJSON](image/image2.png)


- 📊 **`stat_can2021_recensement.csv`**  
  Données de recensement 2021 de Statistique Canada.  
  ![Chargement CSV](image/image3.png)
  ![Chargement CSV](image/image4.png)

- 🔷 **`decoup.shp`**  
  Shapefile des aires de diffusion (DA).  
  ![Chargement Shapefile](image/image5.png)


### Connexion des sources
Les données sont chargées et dirigées vers l'étape de **Reprojection (EPSG:32198)**.

---

## Étape 2 : Transformations

### 🔄 Reprojection (NAD83 → Web Mercator)
- **Reprojector**  
  Les données géospatiales sont reprojetées du système de coordonnées NAD83 vers Web Mercator (EPSG:32198).
  ![Reprojector](image/image6.png)
  ![Reprojector](image/image7.png)

### 🔗 Jointure DAUID **`données des aires de diffusion et csv`**  
- **FeatureJoiner**  
  Une jointure interne (Inner Join) est effectuée entre les données géospatiales (Aires de diffusion) et les données statistiques du fichier CSV. La clé de jointure est l'identifiant DAUID.

  ![Jointure](image/image8.png)
  ![Jointure](image/image9.png)

### 🧹 Nettoyage des données

1. **AttributeManager**  
   Les attributs sont renommés pour une meilleure lisibilité (exemple : `revenu_median`).

     ![Nettoyage des données](image/image11.png)
     ![Nettoyage des données](image/image12.png)
     ![Nettoyage des données](image/image13.png)


2. **AttributeManager**  
   Pour nettoyer la cocuhes des limites administrative de la ville de Montréal pour ne garder que les colonnes importantes.

     ![Nettoyage des données](image/image19.png)
     ![Nettoyage des données](image/image20.png)
     ![Nettoyage des données](image/image21.png)
     ![Nettoyage des données](image/image21.png)


3. **NullAttributeMapper**  
   Les valeurs nulles (NULL) sont remplacées par des zéros (0) pour éviter les erreurs de calcul.

     ![Nettoyage des données](image/image14.png)
     ![Nettoyage des données](image/image15.png)
     ![Nettoyage des données](image/image16.png)
     ![Nettoyage des données](image/image17.png)



4. **Logger**  
   Un suivi des erreurs est mis en place pour identifier les problèmes potentiels dans les données.

### 🗺 Jointure Spatiale des deux entre les limites administratives et les aires de difussions pour placer chaque aires de diffusion dans son arrondissement pour des comparaisons ensuite
- **SpatialFilter**  
  Une jointure spatiale est effectuée pour filtrer les données en fonction de leur intersection avec les limites des arrondissements.

     ![Jointure Spatiale](image/image22.png)
     ![Jointure Spatiale](image/image23.png)

---

## Étape 3 : Calculs

### Calculs des indicateurs
1. **StatisticsCalculator**  
   La somme de la population est calculée pour chaque arrondissement.

   ![Calculs des indicateurs](image/image24.png)
   ![Calculs des indicateurs](image/image25.png)
   ![Calculs des indicateurs](image/image26.png)
   ![Calculs des indicateurs](image/image27.png)


2. **AttributeManager**  
   Enauite, on a utilisé un attributManger pour nettoyer encore renommer la colonne nombre de pop par arrondissement et supprimer la colonnes predicate inutile.
    
    ![AttributeManager](image/image32.png)


---

## Étape 4 : Export des résultats

Les données traitées sont exportées dans la bd pour une visualisatin dans QGIS :

1. 🐘 **PostGIS Writer**  
   Les données sont stockées dans une table PostgreSQL/PostGIS nommée `Table 1 à modifier plus tard par manque d'accès à la bd pour modifier`.

2. 🌐 **GeoJSON Writer**  
   Les données sont exportées au format GeoJSON.

   ![xport des résultats](image/image28.png)


---

## Résultat final
Le processus génère des données géospatiales et statistiques nettoyées, enrichies et prêtes à être utilisées dans des analyses ou des visualisations cartographiques.

![Résultat final](image/image29.png)
![Résultat final](image/image30.png)
