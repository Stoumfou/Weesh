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
        var selectUrls = "SELECT url FROM new_sources";

        mysql.query(selectUrls, function(error, data, fields){
            if(error) throw error;
            for(entry in data) 
                {
                    realUrl = data[entry].url.split('ref')[0];
                    console.log(realUrl); 
                    _saver.parseAndWriteDB(realUrl);
                }
        });

        mysql.query("TRUNCATE TABLE new_sources", function(error, data, fields){
            if(error) throw error;
            console.log("Table truncated !");
        })

    	mysql.end();
    }
};
