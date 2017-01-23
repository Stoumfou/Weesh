#!/bin/bash

# Vider le contenu de la base weesh (sans supprimer la base)
echo -e "\n* Purging weesh database *\n"

mongo weesh --eval "db.dropDatabase();"

# Ajouter un produit
echo -e "\n* Adding new product *\n"
data='{'
data+='"sku":"amazon-games-1"'
data+=',"name":"Hasbro - 94470 - Jeu de Plateau - Monopoly Classique"'
data+=',"providers":'
data+='[{"name":"Amazon","productUrl":"https://www.amazon.fr/Hasbro-94470-Plateau-Monopoly-Classique/dp/B00D2LTWJO/ref=sr_1_1?s=toys&ie=UTF8&qid=1484734361&sr=1-1&keywords=monopoly"}]'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/products

# Ajouter un produit
echo -e "\n* Adding new product *\n"
data='{'
data+='"sku":"amazon-games-2"'
data+=',"name":"Scrabble - Y9593 - Jeu de Réflexion - Original"'
data+=',"providers":'
data+='[{"name":"Amazon","productUrl":"https://www.amazon.fr/Scrabble-Y9593-Jeu-Réflexion-Original/dp/B00CN3SPKY/ref=sr_1_1?ie=UTF8&qid=1485161268&sr=8-1&keywords=scrabble"}]'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/products

# Ajouter un utilisateur
echo -e "\n* Adding new user *\n"

data='{'
data+='"username":"SpongeBob"'
data+=',"password":"bikini"'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/register

# Ajouter un utilisateur
echo -e "\n* Adding new user *\n"

data='{'
data+='"username":"Patrick"'
data+=',"password":"Star"'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/register

# Afficher tous les produits
echo -e "\n* Displaying all products *\n"

curl http://localhost:3000/products

# Afficher tous les utilisateurs
echo -e "\n* Displaying all users *\n"

mongo weesh --eval "db.users.find({});"

