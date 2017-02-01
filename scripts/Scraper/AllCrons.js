var step1 = require('./step1A_selectNewSources');
var step2 = require('./step2A_selectNewItems');
var _mysql = require('mysql');

var CronJob1 = require('cron').CronJob;
new CronJob1('0,10,20,30,40,50 * * * * *', function() {
  console.log('\nCron 1 reading new sources \n');
  step1.saveNewSources();
}, null, true, 'Europe/Paris');

var CronJob2 = require('cron').CronJob;
new CronJob2('5,15,25,35,45,55 * * * * *', function() {
  console.log('\nCron 2 scraping data \n');
  step2.saveNewSources();
}, null, true, 'Europe/Paris');

var CronJob3 = require('cron').CronJob;
new CronJob3('1 * * * * *', function() {
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
    	if(error) console.log('\x1b[31m%s\x1b[0m',"JOB TRUNCATE: "+error);
    	console.log('\x1b[32m%s\x1b[0m', "Table new_sources was truncated !");
    });
}, null, true, 'Europe/Paris');