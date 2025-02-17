# 🛰️ Intégration & Visualisation de Données 3D Nuages de points🏙️
**Laboratoire 5**

> **Objectif :**  
> Ce guide détaille l’ensemble des opérations pour :  
> 1. **Importer** et **nettoyer** des nuages de points LiDAR.  
> 2. **Découper** le nuage de points selon des limites terrestres.  
> 3. **Simplifier** le nuage et y **intégrer** la couleur d’orthophotos.  
> 4. **Transférer** la hauteur et la couleur aux polygones de bâtiments.  
> 5. **Visualiser** le résultat final dans MapLibreGL.

---

## 📑 Table des Matières
1. [Préliminaire : Téléchargement des Données](#préliminaire--téléchargement-des-données)  https://drive.google.com/file/d/1GNEDPSGwSdACGDY3BhyQMRrtKXjtsQb2/view?pli=1
2. [Étape 1 : Importation & Nettoyage des Nuages de Points](#étape-1--importation--nettoyage-des-nuages-de-points)
3. [Étape 2 : Limites Terrestres & Découpage du Nuage](#étape-2--limites-terrestres--découpage-du-nuage)
4. [Étape 3 : Simplification du Nuage de Points](#étape-3--simplification-du-nuage-de-points)
5. [Étape 4 : Ajout de Rasters Géoréférencés](#étape-4--ajout-de-rasters-géoréférencés)
6. [Étape 5 : Jointure Raster & Nuage de Points](#étape-5--jointure-raster--nuage-de-points)
7. [Étape 6 : Ajout des Empreintes & Détails de Bâtiments](#étape-6--ajout-des-empreintes--détails-de-bâtiments)
8. [Étape 7 : Jointure des Propriétés du Nuage dans les Polygones](#étape-7--jointure-des-propriétés-du-nuage-dans-les-polygones)
9. [Étape 8 : Visualisation dans MapLibreGL](#étape-8--visualisation-dans-maplibregl)


---

## Préliminaire : Téléchargement des Données

Étape 1 : Importation & Nettoyage des Nuages de Points
🗃️ 1.1 Ajout des Nuages LiDAR
Sources LAZ à importer via un LASReader pour chaque fichier :
http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/301-5041_2015.laz

http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/301-5040_2015.laz

http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/301-5039_2015.laz

http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/300-5041_2015.laz

http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/300-5040_2015.laz

http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/300-5039_2015.laz

 ![Configuration](photo/1.png)


⚙️ 1.2 Thinner (Filtre de Densité)
Pour chaque flux, on applique un Thinner avec un intervalle de 30 pour alléger la densité de points tout en conservant la géométrie essentielle.

 ![Configuration](photo/2.png)
  ![Configuration](photo/4.png)


➕ 1.3 PointCloudCombiner
Combiner les 6 flux de points en un seul nuage de points.

 ![Configuration](photo/3.png)

🌐 1.4 Reprojection (EPSG:2950 → EPSG:3857)
Utiliser un EsriReprojector (ou un équivalent) pour transformer :
Source : NAD83 / Québec (EPSG:2950)
Cible : Web Mercator (EPSG:3857)
Workflow :
(LASReader + Thinner) x6 → PointCloudCombiner → EsriReprojector → [NuageEn3857]


![Configuration](photo/5.png)
![Configuration](photo/6.png)
![Configuration](photo/7.png)

Étape 2 : Limites Terrestres & Découpage du Nuage
🌍 2.1 Lecture des Limites (GeoJSONReader)
URL : https://data.montreal.ca/dataset/b628f1da-9dc3-4bb1-9875-1470f891afb1/resource/92cb062a-11be-4222-9ea5-867e7e64c5ff/download/limites-terrestres.geojson

![Configuration](photo/8.png)

Reprojeter ces limites de EPSG:4326 vers EPSG:3857.

![Configuration](photo/9.png)

✂️ 2.2 Clipper
Clippee : Le nuage de points en EPSG:3857 issu de l’Étape 1.
Clipper : Le polygone des limites terrestres.
Résultat : Un nuage de points restreint à la zone d’étude.

![Configuration](photo/10.png)
![Configuration](photo/11.png)

Étape 3 : Simplification du Nuage de Points avec un PointCloudThiner
Appliquer un second Thinner (intervalle = 5) sur le nuage découpé pour réduire encore la densité.

![Configuration](photo/12.png)
![Configuration](photo/13.png)
![Configuration](photo/14.png)

Étape 4 : Ajout de Rasters Géoréférencés
Importer les 4 Orthophotos

![Configuration](photo/15.png)

Reprojection :

Transformer les rasters de EPSG:3857 vers EPSG:32188 (équivalent de l’EPSG:2950 dans FME).

![Configuration](photo/16.png)


RasterMosaicker :

![Configuration](photo/17.png)
![Configuration](photo/18.png)

Combiner les 4 rasters en un seul raster homogène.
RasterSelector :
Sélectionnez uniquement les bandes R, G, B.
Supprimez la bande Alpha (transparence).
Reprojection Finale :
Reprojetez le raster mosaïqué de EPSG:32188 vers EPSG:3857 pour l’aligner sur le nuage de points.
Étape 5 : Jointure Raster & Nuage de Points

![Configuration](photo/19.png)
![Configuration](photo/20.png)
![Configuration](photo/21.png)
![Configuration](photo/22.png)
![Configuration](photo/23.png)
![Configuration](photo/24.png)
![Configuration](photo/25.png)




PointCloudOnRasterComponentSetter :

Associe les valeurs R, G, B du raster à chaque point du nuage (selon la position XY).

![Configuration](photo/26.png)
![Configuration](photo/27.png)

PointCloudCombiner :

![Configuration](photo/28.png)
![Configuration](photo/29.png)

Combinez les flux si plusieurs traitements sont effectués séparément.
PointCloudFilter :
Filtrez les points qui n’ont pas hérité de valeurs raster :
Copier
@Component(color_red)!=0&&@Component(color_blue)!=0&&@Component(color_green)!=0

![Configuration](photo/30.png)
![Configuration](photo/31.png)
![Configuration](photo/32.png)





PointCloudCoercer :
ConvertiR le nuage 3D en entités vectorielles ponctuelles, tout en conservant les attributs Z et RGB.

![Configuration](photo/33.png)
![Configuration](photo/34.png)
![Configuration](photo/35.png)


Étape 6 : Ajout des Empreintes & Détails de Bâtiments
Shapefiles Empreintes & Détails :

Empreintes : Fichiers de polygones représentant les toits.
Détails : Fichiers de lignes pour les détails des toits.
ReprojeteR ces fichiers de EPSG:2950 vers EPSG:3857.


![Configuration](photo/36.png)
![Configuration](photo/37.png)
![Configuration](photo/38.png)
![Configuration](photo/39.png)


BoundingBoxAccumulator :
CalculeR l’emprise du nuage de points pour définir la zone d’étude.

![Configuration](photo/40.png)



Clipper :

Clippee : Les polygones et lignes des bâtiments.
Clipper : L’emprise du nuage (Bounding Box) pour éliminer les entités hors zone.

![Configuration](photo/41.png)

PolygonCutter (FME Hub) :

Découper les polygones (toits) à l’aide des lignes de détails.

![Configuration](photo/42.png)

Étape 7 : Jointure des Propriétés du Nuage dans les Polygones
PointOnAreaOverlayer :

Superposer les points (avec leurs attributs Z, R, G, B) sur les polygones des bâtiments.
Cela génère une liste d’attributs pour chaque polygone en fonction des points qu’il contient.

![Configuration](photo/43.png)
![Configuration](photo/44.png)
![Configuration](photo/45.png)


ListSummer :
Calculer la somme des valeurs Z, R, G, B pour chaque polygone.
Compter le nombre de points (par exemple, via _overlaps).

![Configuration](photo/46.png)
![Configuration](photo/47.png)


AttributeCreator : (Calcul des Moyennes)

Définir des moyennes : @Evaluate(@round(@Value(_sum)/@Value(_overlaps),4))



![Configuration](photo/48.png)
![Configuration](photo/49.png)

AttributeManager :

Conserver uniquement les attributs utiles.

![Configuration](photo/50.png)
![Configuration](photo/51.png)


ColorConverter (FME Hub) :

Convertir les valeurs RGB au format web (#RRGGBB).

![Configuration](photo/52.png)
![Configuration](photo/53.png)

GeoJSONWriter :


![Configuration](photo/54.png)


Le Workflow final

![Configuration](photo/55.png)
![Configuration](photo/56.png)
![Configuration](photo/57.png)




Étape 8 : Exporter le résultat final et visualisation dans MapLibreGL
Ouvrir MaplibreGL.html :  file:///D:/cours/Ma%C3%AEtrise%20UQAM/int%C3%A9gration%20et%20visualisation/labo5/donnee/MaplibreGL.html

Rendez-vous dans le répertoire Lab3/results/ et double-cliquez sur le fichier MaplibreGL.html.
Importer le GeoJSON : [Fichier geojson](labo5.json)



Dans l’interface de MapLibreGL, On clique sur Importer (en haut à gauche).
Sélectionner le fichier labo5.json.
Visualiser ainsi les bâtiments avec la couleur moyenne issue du nuage LiDAR.
![Configuration](photo/58.png)
