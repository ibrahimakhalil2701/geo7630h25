# geo7630
# Projet : Importation et Visualisation de Données Géospatiales

Ce projet illustre le processus d'importation d'un fichier contenant des coordonnées géographiques (X, Y) dans une base de données PostgreSQL/PostGIS, et la visualisation des données dans QGIS.

## Étapes du projet

### 1. Lecture du fichier SSV dans FME
- Fichier source : [Lien vers le fichier CSV](https://donnees.montreal.ca/dataset/c1d65779-d3cb-44e8-af0a-b9f2c5f7766d/resource/28a4957d-732e-48f9-8adb-0624867d9bb0/download/businesses.csv)
- Capture d’écran :
  ![Lecture du fichier dans FME 1](captures_etapes/Conf_reader.png)
  ![Lecture du fichier dans FME 2](geo7630h25\captures_etapes\Conf_reader2.png)


### 2. Conversion des coordonnées en géométrie (VertexCreator)
- Utilisation de **VertexCreator** pour créer des points géographiques.
- Capture d’écran :
  ![VertexCreator Configuration 1](geo7630h25\captures_etapes\3.png)
  ![VertexCreator Configuration 2](geo7630h25\captures_etapes\4.png)
  ![VertexCreator Configuration 3](geo7630h25\captures_etapes\5.png)


### 3. Envoi des données vers PostgreSQL
- Configuration du Writer dans FME pour PostgreSQL À savoir j'ai utilisé ma base de donnée postgres, car, celui donnée dans le cours ne marchait pas pour moi.
- Capture d’écran :
  ![Configuration du Writer PostgreSQL 1](geo7630h25\captures_etapes\6.png)
  ![Configuration du Writer PostgreSQL 2](geo7630h25\captures_etapes\7.png)
  ![Configuration du Writer PostgreSQL 3](geo7630h25\captures_etapes\8.png)
  ![Configuration du Writer PostgreSQL 4](geo7630h25\captures_etapes\9.png)
  ![Configuration du Writer PostgreSQL 5](captures_etapes/10.png)
  ![Configuration du Writer PostgreSQL 6](geo7630h25\captures_etapes\11.png)
  ![Configuration du Writer PostgreSQL 7](geo7630h25\captures_etapes\12.png)
  ![Configuration du Writer PostgreSQL 7](geo7630h25\captures_etapes\13.png)

### 4. Visualisation dans QGIS
- Connexion à la base PostgreSQL dans QGIS.
- Configuration de la symbologie.

- Capture d’écran :
  ![Données affichées dans QGIS](geo7630h25\captures_etapes\14.png)
  ![Données affichées dans QGIS](geo7630h25\captures_etapes\15.png)
  ![Données affichées dans QGIS](geo7630h25\captures_etapes\16.png)



## Résultat final
Les données géospatiales de Montréal sont maintenant importées dans PostgreSQL et visualisées avec succès dans QGIS.
