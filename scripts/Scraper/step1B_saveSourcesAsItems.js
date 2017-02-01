var scraper = require('product-scraper');
var request = require('request');
var cheerio = require('cheerio');
var mySQL = require('./step1C_insertSources');

module.exports = {
  parseAndWriteDB: function (source, id) {
          scraper.init(source, function(data){
              mySQL.connectToSave(JSON.stringify(data), id);
          });
      }
};

