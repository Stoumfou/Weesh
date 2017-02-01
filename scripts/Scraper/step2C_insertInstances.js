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

        //console.log(data);

    	var values = [];
    	var itemsREQUESTS = [];
        var base = "INSERT IGNORE INTO items_instances (item_id, seller, price, lastdate) VALUES ((SELECT id FROM items WHERE items.ean="+data.ean+"),";
        
        //INSERT INTO items_instances (item_id, price) VALUES ((SELECT id FROM items WHERE items.ean=8806088243962), 100)
    	for(var i in data.sellerArray) {
            itemsREQUESTS.push(base);
            itemsREQUESTS[i] += "'"+data.sellerArray[i].replace("\'", "").replace("'", "\'").replace("'", "''")
            +"','"+data.priceArray[i].replace("\'", "").replace("'", "\'").replace("'", "''")
            +"','"+data.dateArray[i].replace("\'", "").replace("'", "\'").replace("'", "''")+"');";           
            callQ(mysql,itemsREQUESTS[i],data.ean);
        }        
        
        mysql.end();
    }
}

function callQ(sql, str, ean){
    sql.query(str, function (error, results, fields) {
        if(error) {
            console.log('\x1b[31m%s\x1b[0m',"JOB 2C : "+error);
        }
            // console.log('\x1b[32m%s\x1b[0m', ean + " was saved!"); // Ecrit en vert GJ
        })
}
