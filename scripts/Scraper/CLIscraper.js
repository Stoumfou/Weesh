var scraper = require('product-scraper');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');

// Code exemple

// Amazon, Walmart, Target, BestBuy, Etsy
// node app.js https://www.amazon.com/gp/product/B00X4WHP5E https://www.walmart.com/ip/Call-Of-Duty-Infinite-Warfare-Legacy-Edition-PS4/51747229 https://www.toysrus.fr/product/index.jsp?productId=55856831 https://www.amazon.com/PlayStation-Slim-500GB-Console-Uncharted-Bundle/dp/B01LRLJV28

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

            // /!\ 8 AU HASARD /!\
            fs.writeFile(outputPath + "/" + selectID(val, data), JSON.stringify(data), function(err) {
              if(err) {
                return console.log(err);
              }
              console.log("Site " + val + " was saved!\n");
            });
        });
      }
    });
  }
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

function selectID(url, data){
  var site = extractDomain(url);
  switch(site){
    case "amazon.com":
      return data.id;
    case "fnac.com":
      return data.id;
    case "bestbuy.com":
      return data.id;
  }
}

parse();
