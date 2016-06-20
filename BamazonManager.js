var mysql = require('mysql');
var inquirer  = require ('inquirer');
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

});

console.log('connected as id' + connection.threadId + '\n');
	console.log('============================================');
	console.log('  Welcome to The Bamazon Manager App!');
	//console.log('Please Select one of the options below!');
	console.log('============================================'+ '\n\n');


inquirer.prompt([

	{
        type: "list",
        message: "Please Select one of the options below",
        choices: ["View_Products_for_Sale", "View_Low_Inventory", "Add_to_Inventory", "Add_New_Product"],
        name: "bamazon"
    }

 


	]).then(function (answer) {

//console.log(answer.bamazon);

var choice = answer.bamazon;

console.log(choice);

		if(choice == "View_Products_for_Sale"){
			console.log('\n');
			console.log('============================================');
			console.log('            Welcome to Bamazon!');
			console.log('Below is a list of items available for sale!');
			console.log('============================================'+ '\n');

			connection.query("SELECT * FROM Products", function(err, data){
				if (err) throw err;

				for(var i = 0; i < data.length; i++){
					console.log(data[i].ItemID + " | " + data[i].ProductName + " | " + "$"+ data[i].Price+ " | " +data[i].StockQuantity);
				}
				console.log('\n');

			});
		}else if(choice == "View_Low_Inventory"){
			console.log('\n');
			console.log('========================================');
			console.log('         Welcome to Bamazon!');
			console.log('Below is a list of low inventory items!');
			console.log('========================================'+ '\n');

			connection.query("SELECT * FROM Products WHERE StockQuantity < 5", function(err, data){
				if (err) throw err;

				for(var i = 0; i < data.length; i++){
					console.log(data[i].ItemID + " | " + data[i].ProductName + " | " + "$"+ data[i].Price+ " | " +data[i].StockQuantity);
				}
				console.log('\n');

			});
		}else if(choice == "Add_to_Inventory"){

			console.log('\n');
			console.log('===================================================');
			console.log('               Welcome to Bamazon!');
			console.log('Please follow prompt below to add to existing items');
			console.log('==================================================='+ '\n');

view();

			inquirer.prompt([

				{
			        type: "input",
			        message: "Enter the ID number of the item to be added?",
			        name: "ID"
			    },

			    {
			        type: "input",
			        message: "Enter the amount to be added?",
			        name: "AMT"
			    }



				]).then(function (answers) {
	 
				
				update();

			


function update(){
	var Amount = answers.AMT;
				var itemID = answers.ID;
				console.log(Amount);
	 console.log(itemID);
				connection.query('UPDATE Products SET StockQuantity=StockQuantity+' + Amount + ' ' + 'WHERE ItemID =' + itemID , function(err, data){
				if (err) throw err;

				});

				connection.query("SELECT * FROM Products WHERE ItemID =" + itemID, function(err, data){
				if (err) throw err;

				for(var i = 0; i < data.length; i++){
					console.log(data[i].ItemID + " | " + data[i].ProductName + " | " + "$"+ data[i].Price+ " | " +data[i].StockQuantity);
				}
				console.log('\n');
			});
}
			

			});


		}else if(choice == "Add_New_Product"){
			console.log('\n');
			console.log('============================================');
			console.log('            Welcome to Bamazon!');
			console.log('Below is a list of items available for sale!');
			console.log('============================================'+ '\n');

			connection.query("SELECT * FROM Products", function(err, data){
				if (err) throw err;

				for(var i = 0; i < data.length; i++){
					console.log(data[i].ItemID + " | " + data[i].ProductName + " | " + "$"+ data[i].Price+ " | " +data[i].StockQuantity);
				}
				console.log('\n');

			});
		}


});


function view(){
	connection.query("SELECT * FROM Products", function(err, data){
	if (err) throw err;

	for(var i = 0; i < data.length; i++){

		console.log(data[i].ItemID + "\t  " + data[i].ProductName + "  " + "$"+ data[i].Price);
	}
	console.log('\n');

});
}


 