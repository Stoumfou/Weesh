var scraper = require('product-scraper');
var request = require('request');
var cheerio = require('cheerio');
var mySQL = require('./step1_insertSources');

module.exports = {
  parseAndWriteDB: function (source) {
          scraper.init(source, function(data){
              mySQL.connectToSave(JSON.stringify(data));
          });
      }
};

