#!/bin/bash

# Vider le contenu de la base weesh (sans supprimer la base)
echo -e "\n* Purging weesh database *\n"

mongo weesh --eval "db.dropDatabase();"

# Ajouter un produit
echo -e "\n* Adding new product *\n"
data='{'
data+='"sku":"amazon-games-1"'
data+=',"name":"Hasbro - 94470 - Jeu de Plateau - Monopoly Classique"'
data+=',"provider":'
data+='{"name":"Amazon","productUrl":"https://www.amazon.fr/Hasbro-94470-Plateau-Monopoly-Classique/dp/B00D2LTWJO/ref=sr_1_1?s=toys&ie=UTF8&qid=1484734361&sr=1-1&keywords=monopoly"}'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/products

# Ajouter un produit
echo -e "\n* Adding new product *\n"
data='{'
data+='"sku":"amazon-games-2"'
data+=',"name":"Scrabble - Y9593 - Jeu de Réflexion - Original"'
data+=',"provider":'
data+='{"name":"Amazon","productUrl":"https://www.amazon.fr/Scrabble-Y9593-Jeu-Réflexion-Original/dp/B00CN3SPKY/ref=sr_1_1?ie=UTF8&qid=1485161268&sr=8-1&keywords=scrabble"}'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/products

# Ajouter un utilisateur
echo -e "\n* Adding new user *\n"

data='{'
data+='"username":"SpongeBob99"'
data+=',"password":"bikini"'
data+=',"firstName":"SpongeBob"'
data+=',"lastName":"SquarePants"'
data+=',"gender":"M"'
data+=',"birthDate":"01-05-1999"'
data+=',"address":'
data+='[{"street":"1st Pineapple Street","city":"Bikini Bottom","zip":"1339"}]'
data+=',"email":"sponge.bob@gmail.com"'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/register

# Ajouter un utilisateur
echo -e "\n* Adding new user *\n"

data='{'
data+='"username":"Patrick5"'
data+=',"password":"Star"'
data+=',"firstName":"Patrick"'
data+=',"lastName":"Star"'
data+=',"gender":"M"'
data+=',"birthDate":"02-12-1999"'
data+=',"address":'
data+='[{"street":"2nd Rock Street","city":"Bikini Bottom","zip":"1339"}]'
data+=',"email":"patrick.star@gmail.com"'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/register

# Ajouter un utilisateur
echo -e "\n* Adding new user *\n"

data='{'
data+='"username":"Sandy"'
data+=',"password":"squirrel"'
data+=',"firstName":"Sandra"'
data+=',"lastName":"Cheeks"'
data+=',"gender":"F"'
data+=',"birthDate":"05-30-1999"'
data+=',"address":'
data+='[{"street":"3rd Bubble Dome","city":"Bikini Bottom","zip":"1339"}]'
data+=',"email":"sandra.cheeks@gmail.com"'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/register

# Ajouter une weeshlist
echo -e "\n* Adding new weeshlist *\n"

data='{'
data+='"title":"Idées Noël"'
data+=',"visibility":"PUBLIC"'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/users/Sandy/weeshlists

# Ajouter une weeshlist
echo -e "\n* Adding new weeshlist *\n"

data='{'
data+='"title":"Anniversaire"'
data+=',"visibility":"PRIVATE"'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/users/Sandy/weeshlists

# Ajouter un produit à un utilisateur
echo -e "\n* Adding product to user *\n"

curl -X PUT http://localhost:3000/users/SpongeBob99/products/amazon-games-1

# Ajouter un produit à un utilisateur
echo -e "\n* Adding product to user *\n"

curl -X PUT http://localhost:3000/users/SpongeBob99/products/amazon-games-2

# Ajouter un produit à une weeshlist
echo -e "\n* Adding product to weeshlist *\n"

curl -X PUT http://localhost:3000/users/Sandy/weeshlists/Id%C3%A9es%20No%C3%ABl/products/amazon-games-2

# Afficher un utilisateur
echo -e "\n* Displaying one user *\n"

curl http://localhost:3000/users/SpongeBob99

# Afficher les weeshlists d'un utilisateur
echo -e "\n* Displaying all weeshlists of one user *\n"

curl http://localhost:3000/users/Sandy/weeshlists

# Afficher tous les produits
echo -e "\n* Displaying all products *\n"

curl http://localhost:3000/products

# Afficher tous les utilisateurs
echo -e "\n* Displaying all users *\n"

#mongo weesh --eval "db.users.find({});"
curl http://localhost:3000/users

