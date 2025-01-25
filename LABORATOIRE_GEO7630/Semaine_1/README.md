# 🗺️ geo7630



# 📌 Projet :  Laboratoire 1 : Importation et Visualisation de Données Géospatiales

Ce projet illustre le processus d'importation d'un fichier contenant des coordonnées géographiques (X, Y) dans une base de données PostgreSQL/PostGIS, et la visualisation des données dans QGIS.

---

## 🎯 Objectifs
- Importer des données géospatiales depuis un fichier CSV dans une base PostgreSQL/PostGIS.
- Visualiser ces données dans QGIS.
- Apprendre à utiliser FME pour le traitement des données.

---

## ✏️ Tâches
1. Lire un fichier CSV dans FME.
2. Convertir les coordonnées en géométrie avec **VertexCreator**.
3. Enregistrer les données dans PostgreSQL.
4. Visualiser les données dans QGIS.

---

## 🛠️ Outils utilisés
- ![Logo FME](captures_etapes/FME.png) **FME Workbench**
- ![Logo PostgreSQL](captures_etapes/pg_admin.png) **PostgreSQL/PostGIS**
- ![Logo QGIS](captures_etapes/QGIS.png) **QGIS**

---





## 📂 Étapes du projet

### 1. Lecture du fichier CSV dans FME
- Fichier source : [Lien vers le fichier CSV](https://donnees.montreal.ca/dataset/c1d65779-d3cb-44e8-af0a-b9f2c5f7766d/resource/28a4957d-732e-48f9-8adb-0624867d9bb0/download/businesses.csv)
- Capture d’écran 1 :
  ![Lecture du fichier dans FME 1](captures_etapes/Conf_reader.png)
- Capture d’écran : 2
  ![Lecture du fichier dans FME 2](captures_etapes/Conf_reader2.png)


### 2. Conversion des coordonnées en géométrie (VertexCreator)
- Utilisation de **VertexCreator** pour créer des points géographiques.
- Capture d’écran : 1
  ![VertexCreator Configuration 1](captures_etapes/3.png)
- Capture d’écran : 2
  ![VertexCreator Configuration 2](captures_etapes/4.png)
- Capture d’écran : 3
  ![VertexCreator Configuration 3](captures_etapes/5.png)
- Capture d’écran : 4


### 3. Envoi des données vers PostgreSQL
- Configuration du Writer dans FME pour PostgreSQL À savoir j'ai utilisé ma base de donnée postgres, car, celui donnée dans le cours ne marchait pas pour moi.
- Capture d’écran : 1
  ![Configuration du Writer PostgreSQL 1](captures_etapes/6.png)
- Capture d’écran : 2
  ![Configuration du Writer PostgreSQL 2](captures_etapes/7.png)
- Capture d’écran : 3
  ![Configuration du Writer PostgreSQL 3](captures_etapes/8.png)
- Capture d’écran : 4
  ![Configuration du Writer PostgreSQL 4](captures_etapes/9.png)
- Capture d’écran : 5
  ![Configuration du Writer PostgreSQL 5](captures_etapes/10.png)
- Capture d’écran : 6
  ![Configuration du Writer PostgreSQL 6](captures_etapes/11.png)
- Capture d’écran : 7
  ![Configuration du Writer PostgreSQL 7](captures_etapes/12.png)
- Capture d’écran : 8
  ![Configuration du Writer PostgreSQL 7](captures_etapes/13.png)

### 4. Visualisation dans QGIS
- Connexion à la base PostgreSQL dans QGIS.
- Configuration de la symbologie.

- Capture d’écran : 1
  ![Données affichées dans QGIS](captures_etapes/14.png)
- Capture d’écran : 2
  ![Données affichées dans QGIS](captures_etapes/15.png)
- Capture d’écran : 3
  ![Données affichées dans QGIS](captures_etapes/16.png)



## ✅ Résultat final
Les données géospatiales de Montréal sont maintenant importées dans PostgreSQL et visualisées avec succès dans QGIS.
