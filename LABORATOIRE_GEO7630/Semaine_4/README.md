# 📖 Documentation Scientifique : Intégration et Traitement des Données Raster avec FME et QGIS

## 📝 Introduction
Cette documentation détaille un processus avancé d'intégration et de traitement des données raster en environnement SIG, en mobilisant **FME Workbench** pour les conversions géospatiales et **QGIS** pour la visualisation et l’analyse. L’étude s’appuie sur un modèle de température de surface destiné à l’évaluation des îlots de chaleur urbains.

## 🛠️ Étape 1 : Prétraitement et Conversion des Rasters en Entités Vectorielles

### 🔹 Acquisition et Chargement des Données
1. **Importation des rasters dans FME Workbench** via un **Reader** dédié aux formats raster (GeoTIFF, PNG, COG).
2. **Vérification de l’intégrité des données** pour assurer leur cohérence spatiale et leur compatibilité avec les traitements à suivre.

🖼️ *Capture d’écran : Chargement des rasters dans FME.*

### 🔹 Reprojection et Filtrage Spatial
1. **Reprojection des données** dans le système EPSG:32188 (MTM8), optimisé pour l’analyse spatiale au Québec.
2. **Application d’un filtrage spatial** pour isoler les zones d’intérêt et éliminer les artefacts liés aux limites du raster.

📌 Assurez-vous que la projection est homogène pour toutes les données afin d’éviter toute distorsion dans les étapes suivantes.

🖼️ *Capture d’écran : Vérification des projections dans FME.*

### 🔹 Conversion du Raster en Polygones
1. **Utilisation de `RasterToPolygonCoercer`** pour transformer les cellules raster en entités vectorielles exploitables.
2. **Attribution des valeurs de classification** via `AttributeCreator` afin de conserver l’information thermique.
3. **Lissage des contours** par `RasterDiffuser` pour optimiser la segmentation spatiale.
4. **Généralisation des polygones** avec `Generalizer` pour éliminer les détails non pertinents.

📌 Vérifiez la préservation des attributs et la cohérence des polygones générés avant l’exportation.

🖼️ *Capture d’écran : Processus de conversion raster-vectoriel.*

## 🖼️ Étape 2 : Exportation et Structuration dans PostgreSQL/PostGIS
1. **Configuration d’un Writer PostGIS** pour stocker les entités vectorielles.
2. **Vérification de la compatibilité géométrique** des polygones avant insertion.
3. **Indexation spatiale** (`CREATE INDEX GIST ON geom`) pour améliorer les performances des requêtes SIG.

⚠️ **Problème possible :** Une erreur d’indexation GIST peut survenir en raison d’une hétérogénéité dans les types de géométries. 
✅ **Solution :** Vérifiez l’unicité des types d’objets en appliquant `GeometryValidator` en amont.

🖼️ *Capture d’écran : Configuration du Writer PostGIS.*

## 🗺️ Étape 3 : Visualisation et Analyse dans QGIS

### 🔹 Chargement des Couches SIG
1. **Connexion à la base de données PostGIS** dans QGIS.
2. **Ajout des couches vectorielles** `ilots_chaleur_polygones` et `ilots_chaleur_points`.

🖼️ *Capture d’écran : Connexion à PostgreSQL/PostGIS dans QGIS.*

### 🔹 Application d’une Symbologie Graduée
1. **Catégorisation des polygones** selon les valeurs de température de surface.
2. **Optimisation de la palette de couleurs** pour une meilleure lisibilité des variations thermiques.

📌 Utiliser des classes équilibrées et des contrastes optimaux pour une interprétation immédiate des résultats.

🖼️ *Capture d’écran : Paramétrage des styles dans QGIS.*

## 🔍 Étape 4 : Génération et Structuration des Courbes de Niveau
1. **Application du `ContourGenerator`** pour extraire des courbes de niveau (intervalles de 25m).
2. **Simplification et filtrage des lignes** avec `Generalizer` (Tolérance = 10m).
3. **Transformation des isohypses en polygones** via `AreaBuilder`.
4. **Stockage des résultats dans PostGIS** sous la table `mns_contour_polygones`.

⚠️ **Problème possible :** Présence de géométries invalides après la conversion. 
✅ **Solution :** Vérifier et corriger les polygones avec `GeometryValidator`.

🖼️ *Capture d’écran : Visualisation des courbes de niveau.*

## 🔍 Étape 5 : Superposition des Rasters et Analyses Avancées
1. **Ajout des couches raster MNS et image aérienne** pour contextualiser les résultats.
2. **Création de pyramides raster avec `RasterPyramider`** (10 niveaux) pour accélérer le rendu dans QGIS.
3. **Requête SQL pour filtrer un niveau spécifique** :
```sql
CREATE TABLE VOTRECODEMS.mns_pyramid_lvl_2 AS SELECT * FROM "hm-2002-can-4000-0257_pyramide" WHERE "_pyramid_level" = 2;
```

🖼️ *Capture d’écran : Résultat des pyramides raster dans QGIS.*

---
## 📌 Conclusion et Perspectives
Ce protocole permet une conversion efficace des données raster en objets SIG exploitables. L’intégration des résultats dans un SIG relationnel tel que PostGIS garantit des capacités d’analyse spatiale avancées, adaptées aux études climatiques et urbanistiques.

✅ **Résultat final :** Une cartographie précise des îlots de chaleur, complétée par des courbes de niveau et des images aériennes pour une analyse multi-scalaire.

🔹 **Prochaines évolutions :**
- Amélioration de la résolution des classifications thermiques.
- Intégration d’un modèle prédictif via des outils de machine learning.
- Automatisation du pipeline de traitement avec FME Server.

📌 N’hésitez pas à me faire part de vos suggestions d’amélioration ! 🚀

