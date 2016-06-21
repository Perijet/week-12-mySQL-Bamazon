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
console.log('============================================');

function start(){

inquirer.prompt([

	{
        type: "list",
        message: "Please Select one of the options below",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "bamazon"
    }

	]).then(function (answer) {

	var choice = answer.bamazon;

	switch (choice){
		case "View Products for Sale":
		viewProducts();
		break;

		case "View Low Inventory":
		viewInventory();
		break;

		case "Add to Inventory":
		addInventory();
		break;

		case "Add New Product":
		addProduct();
		break;

		default:
		console.log('choose');
	}
	});
}

start();

function viewProducts(){

	console.log('\n');
	console.log('============================================');
	console.log('            Welcome to Bamazon!');
	console.log('Below is a list of items available for sale!');
	console.log('============================================\n\n');
	console.log('ID\t', 'Product\t\t', 'Price\t', 'Quantity');
	console.log('___________________________________________________ \n');

	connection.query("SELECT * FROM Products", function(err, data){
		if (err) throw err;

		for(var i = 0; i < data.length; i++){
			console.log(data[i].ItemID + " \t " + data[i].ProductName + " \t\t " + "$"+ data[i].Price+ " \t " +data[i].StockQuantity);
		}
		console.log('\n');
		start();
	});
	
}

function viewInventory(){

	console.log('\n');
	console.log('========================================');
	console.log('         Welcome to Bamazon!');
	console.log('Below is a list of low inventory items!');
	console.log('========================================\n\n');
	console.log('ID\t', 'Product\t\t', 'Price\t', 'Quantity');
	console.log('___________________________________________________ \n');

	connection.query("SELECT * FROM Products WHERE StockQuantity < 5", function(err, data){
		if (err) throw err;

		for(var i = 0; i < data.length; i++){
			console.log(data[i].ItemID + " \t " + data[i].ProductName + " \t\t " + "$"+ data[i].Price+ " \t " +data[i].StockQuantity);
		}
		console.log('\n\n');
		start();
	});

}

function addInventory(){

	console.log('\n');
	console.log('===================================================');
	console.log('               Welcome to Bamazon!');
	console.log('Please follow prompt below to add to existing items');
	console.log('===================================================\n\n');
	console.log('ID\t', 'Product\t\t', 'Price\t', 'Quantity');
	console.log('___________________________________________________ \n');

	connection.query("SELECT * FROM Products", function(err, data){
		if (err) throw err;

		for(var i = 0; i < data.length; i++){
			console.log(data[i].ItemID + " \t " + data[i].ProductName + " \t\t " + "$"+ data[i].Price+ " \t " +data[i].StockQuantity);
		}
		console.log('\n');

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



		]).then(function (answers){

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
					console.log(data[i].ItemID + " \t " + data[i].ProductName + " \t\t " + "$"+ data[i].Price+ " \t " +data[i].StockQuantity);
				}
				console.log('\n\n\n');
				start();
				});
			}
			

		});
	});
}

function addProduct(){
	console.log('\n');
	console.log('============================================');
	console.log('            Welcome to Bamazon!');
	console.log('Below is a list of items available for sale!');
	console.log('============================================'+ '\n\n');
	console.log('ID\t', 'Product\t\t', 'Price\t', 'Quantity');
	console.log('___________________________________________________ \n');

	connection.query("SELECT * FROM Products", function(err, data){
		if (err) throw err;

		for(var i = 0; i < data.length; i++){
			console.log(data[i].ItemID + " \t " + data[i].ProductName + " \t\t " + "$"+ data[i].Price+ " \t " +data[i].StockQuantity);
		}
		console.log('\n');

	inquirer.prompt([

		{
	        type: "input",
	        message: "Enter product name?",
	        name: "pName"
	    },

	    {
	        type: "input",
	        message: "Enter department name",
	        name: "dName"
	    },

	    {
	        type: "input",
	        message: "Enter cost",
	        name: "price"
	    },

	    {
	        type: "input",
	        message: "Enter amount",
	        name: "AMT"
	    }



		]).then(function (answers) {
			update();

			console.log('\n');

			console.log(product);
			console.log(department);
			console.log(cost);
			console.log(quantity);

			console.log(product + ", " + department + ", " + cost + ", " + quantity);

			function update(){
				var product = answers.pName;
				var department = answers.dName;
				var cost = answers.price;
				var quantity = answers.AMT;

				connection.query('INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity) VALUES( "'  + product + '", "' + department + '", ' + cost + ', ' + quantity+ ')', function(err, data){
					if (err) throw err;

					for(var i = 0; i < data.length; i++){
						console.log(data[i].ItemID + " | " + data[i].ProductName + " | " + "$"+ data[i].Price+ " | " +data[i].StockQuantity);
					}
					console.log('\n');
					restart();
				});
			
			}
		});

	});
}



function productView(){
	
}


function restart(){
	start();
}
 