# 📖 Projet : Laboratoire 4 : Intégration et Traitement des Données Raster avec FME et QGIS

## 📝 Introduction
Cette documentation détaille un processus avancé d'intégration et de traitement des données raster en environnement SIG, en mobilisant **FME Workbench** pour les analyses et conversions géospatiales et **QGIS** pour la visualisation. L’étude s’appuie sur un modèle de température de surface destiné à l’évaluation des îlots de chaleur urbains.


## 🎯 Objectifs

1. Traiter et analyser divers formats de rasters, notamment TIF, GeoTIFF et PNG.

2. Convertir des valeurs raster en entités vectorielles exploitables.

3. Stocker des données raster non tuilées dans PostgreSQL/PostGIS pour une gestion optimisée.

4. Générer des tuiles raster afin de faciliter la manipulation et la diffusion des données.

5. Construire des pyramides de tuiles raster pour une visualisation web performante.

6. Intégrer les valeurs d'altitude (Z) des rasters aux entités vectorielles.




## Données https://drive.google.com/drive/folders/1iRcyRWS_JiTciNdonm8leC7Nq03hRY5_


## 🌡️ 1 ème Partie Image raster Ville-Marie
## 🛠️ Étape 1 : Prétraitement et Conversion des Rasters en Entités Vectorielles

### 🔹 Acquisition et Chargement des Données
1. **Importation des rasters dans FME Workbench** via un **Reader** dédié aux formats raster (GeoTIFF, PNG, COG).
2. **Vérification de l’intégrité des données** pour assurer leur cohérence spatiale et leur compatibilité avec les traitements à suivre.
3. Créez 1 bookmark pour chacun des images
   Raster analytique - Îlots de chaleurs
   Image aérienne - Ville Marie
   MNS - Ville Marie - 1m res


🖼️ *Capture d’écran : (photo/1png)
🖼️ *Capture d’écran : (photo/2png)
🖼️ *Capture d’écran : (photo/3png)

### 🔹 Reprojection pour l'image de ville Marie
1. **Reprojection des données** dans le système EPSG:32188 (MTM8), optimisé pour l’analyse spatiale au Québec.

📌 Assurer que la projection est homogène pour toutes les données afin d’éviter toute distorsion dans les étapes suivantes.

🖼️ *Capture d’écran : projections dans FME.(photo/5png)
🖼️ *Capture d’écran : projections dans FME. (photo/6png)




### 🔹Étape 2 : Extraction des Métadonnées du Raster avec RasterPropertyExtractor
1. **Le transformateur RasterPropertyExtractor dans FME permet d’extraire des métadonnées essentielles d’un raster, notamment** :

    Nombre de bandes : Identifie le nombre de canaux d’information dans l’image (ex : 4 bandes).
    Dimensions : Nombre de rangées (17127) et de colonnes (16732) de pixels.
    Type de données : Indique la nature des valeurs contenues dans le raster (entiers, flottants, etc.).
    Coordonnées minimales et maximales : Définissent l’emprise géographique du raster dans les axes X et Y.
📌 Utilité : Ces informations sont cruciales pour assurer une transformation adaptée du raster et éviter des erreurs de projection ou d’interprétation des valeurs.


🖼️ *Capture d’écran : Transformer RasterPropertyExtractor dans FME.(photo/4png)
🖼️ *Capture d’écran : Transformer RasterPropertyExtractor dans FME. (photo/7png)





## 🔹Étape 3 : Redimensionnement du Raster avec RasterResampler
**Le transformateur RasterResampler dans FME permet de modifier la résolution spatiale d’un raster en ajustant** :

    Le nombre de rangées et de colonnes : Ici, les dimensions sont réduites d’un facteur de 10 pour diminuer la charge de traitement et améliorer la compatibilité avec d’autres jeux de données.
    La taille des pixels : L’agrandissement ou la réduction des cellules raster permet d’adapter le niveau de détail en fonction des besoins d’analyse.
    L’alignement géospatial : Assure une cohérence entre différents rasters utilisés dans un même projet SIG.
📌 Utilité : Le rééchantillonnage optimise les performances en réduisant la taille des fichiers et facilite l’intégration avec d’autres couches spatiales.

## 📌 Explication rapide des manipulations dans FME Workbench (RasterResampler)
1️⃣ Recherche du RasterResampler : Sélection du transformateur pour modifier la résolution du raster.
2️⃣ Ajout après RasterPropertyExtractor : Extraction du nombre de colonnes (num_columns) et de rangées (num_rows).
3️⃣ Application des formules dynamiques :

@Value(num_columns)/10 et @Value(num_rows)/10 pour réduire la résolution d’un facteur 10.
4️⃣ Paramétrage :
Mode "Rows and Columns" choisi pour contrôler précisément la taille.
Interpolation : Nearest Neighbor, rapide et adaptée aux données catégoriques.
5️⃣ Résultat : Raster allégé, optimisé pour le stockage et l’analyse spatiale. 🚀

🖼️ *Capture d’écran : Transformer RasterResampler dans FME.(photo/8png)
🖼️ *Capture d’écran : Transformer RasterResampler dans FME. (photo/9png)
🖼️ *Capture d’écran : Transformer RasterResampler dans FME. (photo/10png)
🖼️ *Capture d’écran : Transformer RasterResampler dans FME. (photo/11png)



## 📌 Étape 5 : Création de pyramides raster avec RasterPyramider
  Ajout du transformateur RasterPyramider pour générer des niveaux de détails multiples.
  Sélection de l’option "Number of Levels" et définition à 10 niveaux.
  Ces niveaux permettent d’accélérer l’affichage et la navigation dans de grands rasters.
  Stockage des pyramides pour une utilisation optimisée dans un SIG.


🖼️ *Capture d’écran : Transformer RasterPyramdie dans FME.(photo/12png)
🖼️ *Capture d’écran : Transformer RasterPyramdie dans FME. (photo/13png)
🖼️ *Capture d’écran : Transformer RasterPyramdie dans FME. (photo/14png)




## 📌 Étape 6 : Ajout du FeatureWriter pour l'enregistrement des données
Ajout du transformateur FeatureWriter
     Permet d’écrire les données raster transformées dans une base de données PostGIS Raster.
     Format : PostGIS Raster (pour stocker les données raster dans PostgreSQL/PostGIS).
     Connexion : Sélection de la base de données bd_Geo7630h25.
     Nom de la table : hm-2002-can-4000-0257 (où les données raster seront stockées).
     ✅ Objectif final : Stocker les rasters traités dans PostGIS, permettant une gestion avancée et une exploitation via SIG.

🖼️ *Capture d’écran : Ajout du FeatureWriter dans FME.(photo/15png)



## 📌 Étape 7 : Ajout d'un SQLExecuter après le FeatureWriter
Il est utilisé pour exécuter des requêtes SQL directement sur la base de données après l'écriture des données par le `FeatureWriter`. Cela permet d'effectuer des traitements supplémentaires, comme la création de nouvelles tables, l’optimisation des données ou la mise à jour de certains attributs.

1. Ajout du SQLExecuter**  
   - Le Connecter à la sortie `Summary` du `FeatureWriter`.
2. **Paramétrage du SQLExecuter**  
   - **Database Connection** :  à la base de données PostGIS.  
   - **SQL Query** : CREATE TABLE VOTRECODEMS.mns_pyramid_lvl_2 AS SELECT * FROM "hm-2002-can-4000-0257_pyramide" WHERE "_pyramid_level" = 2

🖼️ *Capture d’écran : SQLExecuter dans FME.(photo/16png)
🖼️ *Capture d’écran : SQLExecuter dans FME.(photo/17png)



## 🌡️ 2ème Partie - Intégration de Raster Analytique : Îlots de Chaleur

## 📌 Étape 1 : Reprojection des Îlots de Chaleur

Reprojeter les données raster des îlots de chaleur dans le système de coordonnées approprié pour assurer la compatibilité avec les autres couches spatiales.

Procédure :
1. **Ajout du RasterReprojector**  
   - Insérez le transformateur `RasterReprojector`.
   - Le Connecter à la couche raster des îlots de chaleur.
   - Définir la projection cible sur **EPSG:32188**.

📌 Vérifier que la reprojection est réussie en inspectant les métadonnées du raster.

🖼️ *Capture d’écran :  dans FME.(photo/18png)
🖼️ *Capture d’écran :  dans FME.(photo/19png)

### 🔹 Conversion du Raster en Polygones
1. **Utilisation de `RasterToPolygonCoercer`** pour transformer les cellules raster en entités vectorielles exploitables.
2. **Attribution des valeurs de classification** via `AttributeCreator` afin de conserver l’information thermique.
3. **Lissage des contours** par `RasterDiffuser` pour optimiser la segmentation spatiale.
4. **Généralisation des polygones** avec `Generalizer` pour éliminer les détails non pertinents.

### 🔍 Explication
Le `RasterToPolygonCoercer` est un transformateur essentiel pour convertir des images raster en objets vectoriels. Ce processus permet d'exploiter les données raster sous forme de polygones, facilitant leur manipulation et leur analyse dans les systèmes d’information géographique (SIG).


🖼️ *Capture d’écran :  dans FME.(photo/20png)
🖼️ *Capture d’écran :  dans FME.(photo/21png)
🖼️ *Capture d’écran :  dans FME.(photo/22png)


# 📝 Étape 2 : Stockage des Polygones des Îlots de Chaleur dans PostGIS et Visualisation QGIS

## 🎯 Objectif
Enregistrer les polygones issus du `RasterToPolygonCoercer` dans la base de données **PostGIS** pour faciliter leur manipulation et analyse dans un SIG.

---

## 🛠️ Procédure

### 🔹 1. Ajout du Writer PostGIS
1. **Sélectionnez le `FeatureWriter`**.
2. **Choisir le format de sortie** :  
   - **Format** : `PostGIS` (⚠️ **Ne pas choisir PostGIS Raster**, car nous stockons des vecteurs).
   - **Connexion** : connexion à la base de données PostGIS.

### 🔹 2. Configuration du Writer
1. **Définir les paramètres suivants :**
   - **Nom de la table** : `ilots_chaleur_polygones`
   - **Feature Operation** : `Insert`
   - **Table Handling** : `Create If Needed`


### 🔹 3. Connexion du Writer
1. **Reliez la sortie du `RasterToPolygonCoercer`** au `FeatureWriter`.
2. **Lancez l’exécution du workflow** (`Run`).

---

## 🔍 Validation et Vérification
✅ Une fois l’exécution terminée :
- Vérifier dans l'onglet `Translation Log` qu'il n'y a pas d'erreurs.
- Nous assurer que la table `ilots_chaleur_polygones` est bien créée dans PostGIS.
- Charger la table dans **QGIS** pour confirmer l’affichage des polygones.


🖼️ *Capture d’écran :  dans FME.(photo/23png)
🖼️ *Capture d’écran :  dans FME.(photo/24png)
🖼️ *Capture d’écran :  dans FME.(photo/25png)
🖼️ *Capture d’écran :  dans FME.(photo/26png)





## 📝 Étape 3 : Application du RasterDiffuser  
Améliorer la netteté du raster en accentuant les bords et les détails.

🔹 Ajoutez `RasterDiffuser`.  
🔹 Le Connecter au raster reprojeté.   
🔹 Exécuter et vérifier le rendu.  
 
🖼️ *Capture d’écran :  dans FME.(photo/27png)
🖼️ *Capture d’écran :  dans FME.(photo/28png)




## 📝 Étape 4 : Arrondi des valeurs raster  

🔹 Ajouter `RasterCellValueRounder`.  
🔹 Définir **Decimal places = 1**.  
🔹 Exécuter et vérifier les valeurs.  

🖼️ *Capture d’écran :  dans FME.(photo/29png)


## 📝 Étape 5 : Conversion en polygones  

🔹 Ajouter `RasterToPolygonCoercer`.  
🔹 Attribuer `_label = classification`.  
🔹 Vérifier la génération des polygones.  

🖼️ *Capture d’écran :  dans FME.(photo/30png)




## 📝 Étape 6 : Écriture dans PostGIS  

🔹 Écrire le résultat de `RasterToPolygonCoercer` dans **PostGIS**.  
🔹 **Nom de la table** : `_ilots_chaleur_polygones_sharp`.  
🔹 🗺️ Charger et vérifier dans **QGIS**.  


🖼️ *Capture d’écran :  dans FME.(photo/31png)
🖼️ *Capture d’écran :  dans FME.(photo/36png)



## 📝 Étape 7 : Conversion des valeurs raster  
🔹 Ajouter `RasterCellCoercer`.  
🔹 Le Connecter à la couche raster re-projetée.  
🔹 Exécuter et vérifier les résultats.  

🖼️ *Capture d’écran :  dans FME.(photo/33png)



## 📝 Étape 8 : Écriture dans PostGIS  

🔹 Écrire le résultat de `RasterCellCoercer` dans **PostGIS**.  
🔹 **Nom de la table** : `ilots_chaleur_points`.  
🔹 Charger et vérifier dans **QGIS** (pour extraire la valeur Z dans les props : $z )

🖼️ *Capture d’écran :  dans FME.(photo/33png)
🖼️ *Capture d’écran :  dans FME.(photo/34png)
🖼️ *Capture d’écran :  dans FME.(photo/35png)
🖼️ *Capture d’écran :  dans FME.(photo/36png)
🖼️ *Capture d’écran :  dans FME.(photo/37png)



## 📝 3ème Partie : Intégration de Raster (MNS)  

## 🛠️ Étape 1 : Génération des courbes de niveau  

### 🎯 Objectif  
Le **ContourGenerator** est utilisé pour convertir un **Modèle Numérique de Surface (MNS)** en **lignes de contour**, représentant des altitudes spécifiques à des intervalles réguliers. Ces courbes sont essentielles pour visualiser la topographie d’un terrain en 2D.

### 🔹 Fonctionnement  
1. **Analyse du raster MNS** : Le transformateur parcourt le raster et détecte les valeurs d’altitude.  
2. **Création des courbes de niveau** : Il génère des lignes correspondant aux altitudes multiples de l’intervalle défini.  

📌 **Remarque** : Plus l’intervalle est petit, plus le nombre de courbes générées est important, augmentant ainsi le temps de calcul et la complexité du rendu.  

🖼️ *Capture d’écran :  dans FME.(photo/38png)
🖼️ *Capture d’écran :  dans FME.(photo/39png)



## 📝 Étape 2 : Simplification des courbes de niveau  

### 🎯 Objectif  
Le **Generalizer** est utilisé pour **réduire la complexité** des courbes de niveau générées, en diminuant le nombre de sommets tout en **préservant leur forme générale**. Cela permet d'améliorer la lisibilité et d'optimiser les performances du SIG.  

### 🔹 Fonctionnement  
1. **Analyse des lignes générées** : Détecte les segments trop détaillés.  
2. **Réduction des sommets** : Applique un algorithme de simplification pour alléger la géométrie.  
3. **Optimisation des données** : Produit des courbes plus fluides et plus légères à manipuler dans QGIS ou PostGIS.  

📌 **Remarque** : Ajuster le paramètre de **tolérance** pour équilibrer entre précision et simplification. Une tolérance trop élevée pourrait altérer la fidélité du contour.  

🖼️ *Capture d’écran :  dans FME.(photo/40png)
🖼️ *Capture d’écran :  dans FME.(photo/41png)
🖼️ *Capture d’écran :  dans FME.(photo/42png)



# 📝 Étape 3 : Création de Polygones avec `AreaBuilder`

### 🎯 Objectif  
Le **`AreaBuilder`** permet de **convertir les lignes de contour** générées en **polygones fermés**, facilitant ainsi leur exploitation dans les analyses SIG.

📌 **Remarque** : On le conserve **options par défaut** pour assurer une conversion optimale.  


🖼️ *Capture d’écran :  dans FME.(photo/43png)
🖼️ *Capture d’écran :  dans FME.(photo/44png)
---

# 📝 Étape 4 : Écriture des Polygones dans PostGIS

### 🎯 Objectif  
Stocker les polygones générés dans une base **PostGIS** pour les manipuler dans un SIG comme **QGIS**.

### 🔹 Procédure  
🔹 Ajouter un **FeatureWriter**.  
🔹 Choisir le format **PostGIS**.  
🔹 Définir **Nom de la table** : `mns_contour_polygones`.  
🔹 Exécuter et vérifier dans **QGIS**. 

🖼️ *Capture d’écran :  dans FME.(photo/45png)


# 🖼️ Visualisation dans QGIS  

### 🎯 Objectif  
Afficher et analyser les **polygones vectoriels** générés, contenant une **propriété d’élévation**, afin d’exploiter ces données dans des analyses SIG avancées.  

### 🔹 Résultats obtenus  
✅ Les polygones intègrent les valeurs d’altitude extraites des courbes de niveau.  
✅ Ces données peuvent être utilisées pour réaliser une **jointure spatiale** avec d’autres couches SIG, comme les **bâtiments**, permettant ainsi de **modéliser l’extrapolation en 2.5D**.  




# 📌 Conclusion 

## 🎯 Conclusion  
Ce laboratoire a permis de mettre en œuvre un **flux de traitement SIG avancé** intégrant **FME Workbench et QGIS** pour l'analyse et l'intégration des données raster. Les principales étapes réalisées sont :  

✅ **Traitement et analyse des rasters** (image aérienne, îlots de chaleur, MNS).  
✅ **Conversion des valeurs raster en vecteurs** pour faciliter leur manipulation.  
✅ **Stockage optimisé dans PostgreSQL/PostGIS** afin d'assurer une gestion efficace.  
✅ **Création de pyramides raster et de tuiles** pour accélérer l'affichage et la navigation.  
✅ **Génération de courbes de niveau et de polygones 3D** permettant l’extrapolation 2.5D.  
✅ **Intégration des résultats dans QGIS** pour une analyse spatiale avancée.  

📌 **Les outils utilisés** tels que `RasterResampler`, `RasterToPolygonCoercer`, `Generalizer`, et `ContourGenerator` ont permis d'optimiser les données et de produire des résultats précis et exploitables dans un SIG.

---

📌 **Projet réussi !** ✅  
