var _mysql = require('mysql');

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = 'sweesh';

var mysql = _mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});
        
function linkItemToWeeshlist(){
	var weeshlist = "INSERT INTO weeshlists(id, user_id, name, visibility) VALUES (1, 1, 'Weeshlist de Sami', 'private');";
	mysql.query(weeshlist, function (error, results, fields) {
    	if(error) throw error;
    	console.log('\x1b[32m%s\x1b[0m', results); // Ecrit en vert GJ
	});

	var lnk = "INSERT INTO itemslnkweeshlists(item, weeshlist) VALUES (40, 1);";
	mysql.query(lnk, function (error, results, fields) {
    	if(error) throw error;
    	console.log('\x1b[32m%s\x1b[0m', results); // Ecrit en vert GJ
	});

	var select = "SELECT * from itemslnkweeshlists";
	mysql.query(select, function (error, results, fields) {
    	if(error) throw error;
    	console.log('\x1b[32m%s\x1b[0m', results); // Ecrit en vert GJ
	});
}

linkItemToWeeshlist();


mysql.end();
