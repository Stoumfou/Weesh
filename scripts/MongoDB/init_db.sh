#!/bin/bash

# Ajouter un produit
data='{'
data+='"sku":"amazon-books-1"'
data+=',"name":"Hasbro - 94470 - Jeu de Plateau - Monopoly Classique"'
data+=',"providers":'
data+='[{"name":"Amazon","productUrl":"https://www.amazon.fr/Hasbro-94470-Plateau-Monopoly-Classique/dp/B00D2LTWJO/ref=sr_1_1?s=toys&ie=UTF8&qid=1484734361&sr=1-1&keywords=monopoly"}]'
data+='}'

curl -H 'Content-Type: application/json' -d "$data" http://localhost:3000/products

# Afficher les produits
#curl http://localhost:3000/products
