var _mysql = require('mysql');
var errorCount = 0;

var CronJob2 = require('cron').CronJob;
new CronJob2('1 * * * * *', function() {
  console.log('\nCron 3 Cleaning table new_sources \n');
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
    mysql.query("TRUNCATE TABLE new_sources", function(error, results, fields){
    	if(error) {
    		console.log('\x1b[31m%s\x1b[0m', "Truncate : "+error);
    		errorCount++;
    	}
    	console.log('\x1b[32m%s\x1b[0m', "Table new_sources was truncated !");
    });

    if(errorCount==0) console.log('\x1b[34m%s\x1b[0m', "Truncate successful : "+errorCount+" error(s) found");
    mysql.end();
}, null, true, 'Europe/Paris');