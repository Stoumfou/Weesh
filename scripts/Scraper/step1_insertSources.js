var _mysql = require('mysql');


module.exports = {
  connectToSave: function (metadata) {

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
    	for(var k in data){
            if(k=="isbn" || k=="ean" || k=="brand" || k=="model" || k=="title" || k=="description" || k=="image" || k=="tags")
    		{
                itemsREQUEST += k;
                itemsREQUEST += ",";        
                values.push("'"+data[k].replace("\'", "")+"'");
            }
        }

        itemsREQUEST = itemsREQUEST.substring(0, itemsREQUEST.length - 1) + ") VALUES (";

        itemsREQUEST += values + ");";
        console.log(itemsREQUEST);

        mysql.query(itemsREQUEST, function (error, results, fields) {
            if(error) throw error;
                console.log('\x1b[32m%s\x1b[0m', data.url + " was saved!"); // Ecrit en vert GJ
            });

        mysql.end();
    }
}
