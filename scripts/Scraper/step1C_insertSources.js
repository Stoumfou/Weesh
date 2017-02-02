var _mysql = require('mysql');
var createLink = require('./step1D_linkWL')

module.exports = {
  connectToSave: function (metadata, id) {

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
    	var data = JSON.parse(metadata); // On parse l'objet reçu en JSON
    	mysql.connect();
    	var values = [];
    	var itemsREQUEST = "INSERT IGNORE INTO items(";

        var urlQ = "";

    	for(var k in data){
            if(k=="isbn" || k=="ean" || k=="brand" || k=="model" || k=="title" || k=="price" || k=="description" || k=="image" || k=="tags" || k=="url")
    		{
                itemsREQUEST += k;
                itemsREQUEST += ",";        
                values.push("'"+data[k].replace("\'", "").replace("'", "\'").replace("'", "''")+"'");
            }
            if(k=="url") urlQ = data[k].replace("\'", "").replace("'", "\'").replace("'", "''");
        }

        itemsREQUEST = itemsREQUEST.substring(0, itemsREQUEST.length - 1) + ") VALUES (";

        itemsREQUEST += values + ");";
        console.log(itemsREQUEST);

        mysql.query(itemsREQUEST, function (error, results, fields) {
            if(error) {
                console.log('\x1b[31m%s\x1b[0m', "JOB 1C_a : "+error);
            }
                //console.log('\x1b[32m%s\x1b[0m', data.url + " was saved!"); // Ecrit en vert GJ
            else{
                
            }
        });

        // Récupération de l'item_id via URL
        var linkREQUEST = "SELECT id FROM items WHERE url = '"+urlQ+"'";
        console.log('\x1b[32m%s\x1b[0m', linkREQUEST);
        mysql.query(linkREQUEST, function (error, results, fields) {
            if(error) {
                console.log('\x1b[33m%s\x1b[0m', "JOB 1C_b : "+error);
            }
                //console.log('\x1b[32m%s\x1b[0m', data.url + " was saved!"); // Ecrit en vert GJ
            else createLink.continue(results[0].id, id);
        });

        mysql.end();
    }
}
