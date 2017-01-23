var scraper = require('product-scraper');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, "/toBeCrawled/");

function parseFiles(){
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
                console.log('\x1b[32m%s\x1b[0m', line + " was saved!"); // Ecrit en vert
              });
          });
        });
      }
    });
  }
}
/*

// Boucle pour parser et stocker les sites en ligne de commande : "node app.js site1 site2 site3 ..."
function parse(){
  if(process.argv.length > 2){
    process.argv.forEach(function (val, index, array) {

      console.log(index + ': ' + val);
      if(val.includes("http")){

        scraper.init(val, function(data){
            var outputPath = path.join(__dirname, "/Sites/") + extractDomain(val);
            console.log(outputPath);
            // On crée un dossier pour stocker chaque domaine différent
            if(!fs.existsSync(outputPath)){
              fs.mkdirSync(outputPath);
            }

            fs.writeFile(outputPath + "/" + data.id, JSON.stringify(data), function(err) {
              if(err) {
                return console.log(err);
              }
              console.log("Site " + val + " was saved!\n");
            });
        });
      }
    });
  }
}*/

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

// parse();
parseFiles();
