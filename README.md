# CabinetDentaire

Application Web pour Cabinet Dentaire (Angular 16) : Gestion simplifiée des rendez-vous, patients et traitements avec une interface publique pour l'information et prise de rendez-vous, et une interface privée pour la gestion des données. 




![Cabinet dentaire](https://github.com/user-attachments/assets/f80861ac-78f5-4957-9b26-e1d77f49f70b)



## Fonctionalités

● Authentification 
● Gérer un patient: Ajouter, modifier et supprimer un patient.
● Gérer un rendez-vous : Prendre, modifier et supprimer des rendez-vous..
● Gérer un traitement : Ajouter, suivre et mettre à jour les soins apportés.
● Consultation des informations du cabinet (Page accueil, page nos-traitement, page prendre un rendez-vous en ligne) 


## Build Docker Image

docker build -t aichabenjdir/cabinet-dentaire .

## Run Docker Image

docker run -d -p 8083:80 -p 4000:3000 aichabenjdir/cabinet-dentaire

## Tag Image

docker tag aichabenjdir/cabinet-dentaire aichabenjdir/cabinet-dentaire:1.0

## Push Docker Image

docker push aichabenjdir/cabinet-dentaire:1.0

## Pull Docker Image

docker pull aichabenjdir/cabinet-dentaire:1.0
## Contributeurs
  Aïcha Benjdir 

