var mysql = require('mysql');
//var inquirer = require('inquirer');
var prompt = require('prompt');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: process.argv[2],
	database: 'Bamazon'
});


connection.connect(function(err){

	if (err) throw err;

	console.log('connected as id' + connection.threadId + '\n');
	console.log('============================================');
	console.log('            Welcome to Bamazon!');
	console.log('Below is a list of items available for sale!');
	console.log('============================================'+ '\n\n');
	
	console.log('ID \t', 'Product & Price');
	console.log('____________________________________________ \n');
});



connection.query("SELECT * FROM Products", function(err, data){
	if (err) throw err;

	for(var i = 0; i < data.length; i++){

		console.log(data[i].ItemID + "\t  " + data[i].ProductName + "  " + "$"+ data[i].Price);
	}
	console.log('\n');

});



function start(){
	console.log('Please enter the product ID and and amount when prompted below');
	prompt.start();
	prompt.get(['ID', 'AMT'], function (err, result) {
		if (err) throw err;
		var itemID = result.ID;
		var Amount = result.AMT;
		console.log('\n' );
	
		if(isNaN(itemID)){
			console.log('The product ID entered is not a number');
			console.log('');
			restart();
		}else{
			connection.query("SELECT * FROM Products WHERE itemID =" + itemID, function(err, data){
			if (err) throw err;

			for(var i = 0; i < data.length; i++){

			

			var stock = data[i].StockQuantity;

			if(isNaN(Amount)){
				console.log('The amount entered is not a number');
				console.log('');
				restart();

			}
			
			else if(Amount < stock){

				console.log('\n' );
				console.log('*********************'); 
				console.log('Your order details'); 
				console.log('*********************');
				console.log('');
				console.log('Item ID: \t', itemID); 
				console.log('Name: \t\t', data[0].ProductName); 
				console.log('Available: \t', data[0].StockQuantity); 
				console.log('Ordered: \t', Amount); 
				console.log('_____________________' ); 
				console.log('Total:', '$'+(Amount * data[0].Price)); 
				console.log('_____________________' ); 
				console.log('\n' );
				
				connection.query('UPDATE Products SET StockQuantity=StockQuantity+' + Amount + ' ' + 'WHERE ItemID =' + itemID , function(err, data){
				if (err) throw err;

				});

			}else{
				console.log("Insufficient quantity");
				restart();

		}

			}

			});
			
		}

});

}

start();


var restart = function(){
	start();
};


	







