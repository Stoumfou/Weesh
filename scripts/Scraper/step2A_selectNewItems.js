var _mysql = require('mysql');
var _saver = require('./step2B_saveItemsAsInstances');


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

        mysql.connect();

        // On lit la table pour récupérer les URLs des nouveaux objets ajoutés depuis le plug-in
        var selectUrls = "SELECT ean FROM items WHERE ean IS NOT NULL";

        mysql.query(selectUrls, function(error, data, fields){
            if(error) throw error;
            for(entry in data) 
                {
                    _saver.parseAndWriteDB(data[entry].ean);
                }
        });

    	mysql.end();
    }
};
