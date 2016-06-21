
var mysql = require('mysql');
var prompt = require('prompt');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: process.argv[2],
	database: 'Bamazon'
});

//Establishing connection with the Bamazon database
connection.connect(function(err){

	if (err) throw err;

	console.log('connected as id' + connection.threadId + '\n');
	console.log('============================================');
	console.log('            Welcome to Bamazon!');
	console.log('Below is a list of items available for sale!');
	console.log('============================================'+ '\n\n');
	
	console.log('ID\t', 'Product\t\t', 'Price');
	console.log('____________________________________________ \n');

});

//After connection established running first query to display store products
connection.query("SELECT * FROM Products", function(err, data){
	if (err) throw err;

	for(var i = 0; i < data.length; i++){

		console.log(data[i].ItemID + "\t  " + data[i].ProductName + "\t\t " + "$"+ data[i].Price + '\t\t');
	}
	console.log('\n');

//Function to check store quantities and if enough stock allow user to purchase product and update the database quantity
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

//Displays the users order and provides the total cost of items purchased
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
					start();

//Connection to update the Products database after purchase is successful
					connection.query('UPDATE Products SET StockQuantity=StockQuantity+' + Amount + ' ' + 'WHERE ItemID =' + itemID , function(err, data){
						if (err) throw err;

					});

				}else{

//If there is insufficent quantities in stock message is displayed an the prompt is displayed to allow user to modify request					
					console.log("Insufficient quantity");
					restart();

				}

				}

				});
				
			}

		});

	}

start();

});

//Restart function to allow the prompts to loop in the program until the user manually quits
var restart = function(){
	start();
};


	







