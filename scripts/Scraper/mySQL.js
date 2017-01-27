var _mysql = require('mysql');


module.exports = {
  connectToDB: function (metadata) {

  		var HOST = 'localhost';
		var PORT = 3306;
		var MYSQL_USER = 'root';
		var MYSQL_PASS = '';
		var DATABASE = 'sweesh';
		var TABLE = 'users';

    	var mysql = _mysql.createConnection({
    	host: HOST,
    	port: PORT,
    	user: MYSQL_USER,
    	password: MYSQL_PASS,
    	database: DATABASE,
    	table: TABLE
	});
    	var data = JSON.parse(metadata); // On parse l'objet reçu en JSON
    	mysql.connect();
    	var values = [];
    	var sql = "INSERT INTO items(";
    	for(var k in data){
    		sql += k;
    		sql += ",";
    		for(var key in data[k]){
    			if(typeof data[k] === 'string') data[k] = data[k].replace("\'", "");
    			if(typeof data[k][key] === 'string') data[k][key] = data[k][key].replace("\'", "");
    		}    		
    		values.push("'"+data[k]+"'");
    	}

    	sql = sql.substring(0, sql.length - 1) + ") VALUES (";

    	sql += values + ");";

    	mysql.query(sql, function (error, results, fields) {
    		if(error) throw error;
            console.log('\x1b[32m%s\x1b[0m', data.url + " was saved!"); // Ecrit en vert GJ
		});
    	mysql.end();
 	},
};