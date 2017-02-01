var _mysql = require('mysql');
var _saver = require('./step1B_saveSourcesAsItems');


module.exports = {
  saveNewSources: function () {

    var HOST = 'localhost';
    var PORT = 3306;
    var MYSQL_USER = 'root';
    var MYSQL_PASS = '';
    var DATABASE = 'weesh';

    var mysql = _mysql.createConnection({
    	host: HOST,
    	port: PORT,
    	user: MYSQL_USER,
    	password: MYSQL_PASS,
    	database: DATABASE,
    });

        var realUrl;

        mysql.connect();

        // On lit la table pour récupérer les URLs des nouveaux objets ajoutés depuis le plug-in
        var selectUrls = "SELECT url, weeshlistid FROM new_sources";

        mysql.query(selectUrls, function(error, data, fields){
            if(error) console.log('\x1b[31m%s\x1b[0m',error);
            else{
                for(entry in data) 
                {
                    realUrl = data[entry].url.split('?')[0];
                    console.log(realUrl); 
                    _saver.parseAndWriteDB(realUrl, data[entry].weeshlistid);
                }
            }          
        });


        console.log('\x1b[32m%s\x1b[0m', "Job 1 (NEW ENTRIES) finished");
    	mysql.end();
    }
};
