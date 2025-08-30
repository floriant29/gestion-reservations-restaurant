# gestion-reservations-restaurant

Gestion des reservation restaurant et previsionnels repas
- connection api a mews pour recuperer le nombre de produits restaration : /api/connector/v1/orderItems/getAll
- gestion des reservation restaurant de la reception de l'hôtel 
- back-office IT pour la gestion des filtres des requetes API
- stockage en base de donnees
- sso azure avec gestion des roles (reception + it)

L'objectif etant de communiquer le nombre de repas par type et par jour : petit dejeuner, dejeuner et diner.

En compilant les requetes :
- API : 1 requette par type de repas (petit dejeuner, dejeuner et diner) et sommes des produits rerourne pour le previ
- reservations dans l'application web (on ne fait que lire api mews)
