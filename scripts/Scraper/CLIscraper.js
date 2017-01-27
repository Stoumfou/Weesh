var scraper = require('product-scraper');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var mySQL = require('./mySQL');
var filePath = path.join(__dirname, "/toBeCrawled/");

function parseAndWriteFiles(){
  if(process.argv.length > 2){
    process.argv.forEach(function (filename, index, array) {

      console.log(index + ': ' + filename);
      if(filename.includes(".txt")){
        var file = filePath + filename;
        var lineReader = require('readline').createInterface({
          input: require('fs').createReadStream(file)
        });
        lineReader.on('line', function (line) {
          scraper.init(line, function(data){
              var outputPath = path.join(__dirname, "/Sites/") + extractDomain(line);
              // On crée un dossier pour stocker chaque domaine différent
              if(!fs.existsSync(outputPath)){
                fs.mkdirSync(outputPath);
              }

              fs.writeFile(outputPath + "/" + data.id, JSON.stringify(data), function(err) {
                if(err) {
                  return console.log('\x1b[41m%s\x1b[0m',err);
                }
                console.log('\x1b[32m%s\x1b[0m', line + " was saved!"); // Ecrit en vert GJ
              });
          });
        });
      }
    });
  }
}

function parseAndWriteDB(){
  // Si des paramètres sont présents en ligne de commande
  if(process.argv.length > 2){
    process.argv.forEach(function (filename, index, array) {

      console.log(index + ': ' + filename);
      if(filename.includes(".txt")){
        var file = filePath + filename;
        // Lecture ligne par ligne des fichiers texte
        var lineReader = require('readline').createInterface({
          input: require('fs').createReadStream(file)
        });

        lineReader.on('line', function (line) {
          // On scrape et on entre le produit dans la base mySQL
          scraper.init(line, function(data){
              mySQL.connectToDB(JSON.stringify(data)); // Connection à la base mySQL
          });
        });
      }
    });
  }
  else console.log("Pas assez de paramètres ! Veuillez écrire la commande comme suit : node CLIscraper.js <site1>.txt <site2>.txt ...");
}

function extractDomain(url) {
    var sub;
    if (url.indexOf("://") > -1) {
        sub = url.split("/")[2]
    } else {
        sub = url.split("/")[0]
    }
    sub = sub.split(":")[0];
    parts = sub.split(".");
    lenparts = parts.length;
    if (lenparts == 1) {
        return sub
    }
    return parts[lenparts - 2] + "." + parts[lenparts - 1];
}

//parseAndWriteFiles();
parseAndWriteDB();
