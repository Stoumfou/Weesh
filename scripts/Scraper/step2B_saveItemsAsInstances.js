var scraper = require('product-scraper');
var request = require('request');
var cheerio = require('cheerio');
var mySQL = require('./step2C_insertInstances');

module.exports = {
  parseAndWriteDB: function (source) {
          scraper.init("https://www.eanfind.fr/"+source, function(data){
              mySQL.connectToSave(JSON.stringify(data));
          });
      }
};

