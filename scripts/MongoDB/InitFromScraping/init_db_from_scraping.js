var fs = require('fs');
var path = require('path');
var request = require('request');
const scrapingDir = '/home/admean/Weesh/scripts/Scraper/Sites/';

// Exécution du script
main();

// Fonction principale
function main() {
    console.log('start');
    walk(scrapingDir, handleFile);
}

// Fonction qui parcours tous les fichiers d'un répertoire récursivement
// et applique un callback à chacun des fichiers
function walk(currentDirPath, callback) {
    // Lire le contenu du répertoire
    fs.readdir(currentDirPath, function (err, files) {
        if (err) {
            throw new Error(err);
        }
        // Pour chaque file (fichier ou répertoire)
        files.forEach(function (name) {
            var filePath = path.join(currentDirPath, name); // Chemin entier du fichier
            //console.log('filePath: ' + filePath);
            var stat = fs.statSync(filePath);
            // Si c'est un fichier, on appelle le callback
            if (stat.isFile()) {
                callback(filePath);
            }
            // Si c'est un répertoire, on rappelle cette fonction récursivement
            else if (stat.isDirectory()) {
                walk(filePath, callback);
            }
        });
    });
}

// Fonction qui gère la lecture d'un JSON et l'ajout en base de données
function handleFile(filePath) {
    // On lit le fichier JSON
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) throw err;
        //console.log('data: ' + data);

        var json = JSON.parse(data); // On transforme en objet JSON pour le manipuler
        json = scrapingToProductModel(json); // On transpose en accord avec le modèle Product
        postProduct(json); // On envoie une requête POST à l'API pour ajouter le Product
    });
}

// Fonction qui transpose le JSON en sortie du scraper vers les bons attributs du modèle Product
function scrapingToProductModel(json) {
    var newJson = {
        "sku": json.id, // TODO MHU à modifier par provider-id
        "name": json.title,
        "provider": [{
            "name": "amazon", // TODO MHU récupérer le nom du provider
            "productUrl": json.url
        }],
        //"price": json.price // TODO MHU traiter les cas où price = 3.3€, 3€3, €3.3, et le séparateur point ou virgule
        "price": 10
    };

    return newJson;
}

function postProduct(json) {
    //console.log(json);

    // En-tête
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/json'
    };

    // Configuration de la requête
    var options = {
        url: 'http://localhost:3000/products',
        method: 'POST',
        headers: headers,
        json: json
    };

    // Exécution de la requête
    request(options, function (error, response, body) {
        console.log(body);
        console.log(body.provider);
        if (!error && response.statusCode == 200) { // TODO MHU à quoi correspond 200 ?
            // Print out the response body
            console.log(body)
        }
    });
}