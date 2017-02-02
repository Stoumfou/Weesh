var _mysql = require('mysql');

module.exports = {
  continue: function (iid, wid) {

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

    	var request = "INSERT IGNORE INTO items_weesh_lists(item_id, weesh_list_id) VALUES ("+iid+","+wid+");";
        console.log('\x1b[32m%s\x1b[0m', request);
        mysql.query(request, function (error, results, fields) {
            if(error) console.log('\x1b[31m%s\x1b[0m', "JOB 1D : "+error);
                //console.log('\x1b[32m%s\x1b[0m', data.url + " was saved!"); // Ecrit en vert GJ
            else console.log(results);
        });
    }
}
