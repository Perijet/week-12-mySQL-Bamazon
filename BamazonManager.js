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

//Establishing connection with the Bamazon database
connection.connect(function(err){
	if (err) throw err;
});

console.log('connected as id' + connection.threadId + '\n');
console.log('============================================');
console.log('  Welcome to The Bamazon Manager App!');
console.log('============================================');

//Function that starts the program and prompts the user for input based on four choices
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

//Invoking the start function
start();

// function that displays items available for sale based on users input from start function
function viewProducts(){

	console.log('\n');
	console.log('============================================');
	console.log('            Welcome to Bamazon!');
	console.log('Below is a list of items available for sale!');
	console.log('============================================\n\n');
	console.log('ID\t', 'Product\t\t', 'Price\t', 'Quantity');
	console.log('___________________________________________________ \n');

//Query the Products database and display items available for sale
	connection.query("SELECT * FROM Products", function(err, data){
		if (err) throw err;

		for(var i = 0; i < data.length; i++){
			console.log(data[i].ItemID + " \t " + data[i].ProductName + " \t\t " + "$"+ data[i].Price+ " \t " +data[i].StockQuantity);
		}
		console.log('\n');
		start();
	});
	
}

//Function to select only items in the database with a quantity lower than 5
function viewInventory(){

	console.log('\n');
	console.log('========================================');
	console.log('         Welcome to Bamazon!');
	console.log('Below is a list of low inventory items!');
	console.log('========================================\n\n');
	console.log('ID\t', 'Product\t\t', 'Price\t', 'Quantity');
	console.log('___________________________________________________ \n');

//Database query to select only products with a quantity less than 5
	connection.query("SELECT * FROM Products WHERE StockQuantity < 5", function(err, data){
		if (err) throw err;

		for(var i = 0; i < data.length; i++){
			console.log(data[i].ItemID + " \t " + data[i].ProductName + " \t\t " + "$"+ data[i].Price+ " \t " +data[i].StockQuantity);
		}
		console.log('\n\n');
		start();
	});

}

//Function to allow user to add to existing inventory items
function addInventory(){

	console.log('\n');
	console.log('===================================================');
	console.log('               Welcome to Bamazon!');
	console.log('Please follow prompt below to add to existing items');
	console.log('===================================================\n\n');
	console.log('ID\t', 'Product\t\t', 'Price\t', 'Quantity');
	console.log('___________________________________________________ \n');

//Query to database to display all items so the user hasv a reference for selection
	connection.query("SELECT * FROM Products", function(err, data){
		if (err) throw err;

		for(var i = 0; i < data.length; i++){
			console.log(data[i].ItemID + " \t " + data[i].ProductName + " \t\t " + "$"+ data[i].Price+ " \t " +data[i].StockQuantity);
		}
		console.log('\n');

//Prompts the user for input to update the database
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

//Based on user input the query updates the selected item in the database
				connection.query('UPDATE Products SET StockQuantity=StockQuantity+' + Amount + ' ' + 'WHERE ItemID =' + itemID , function(err, data){
					if (err) throw err;

				});

//Query to select the updated item and show the user that the item was updated
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

//Function that allows the user to add additional products to the database
function addProduct(){
	console.log('\n');
	console.log('============================================');
	console.log('            Welcome to Bamazon!');
	console.log('Below is a list of items available for sale!');
	console.log('============================================'+ '\n\n');
	console.log('ID\t', 'Product\t\t', 'Price\t', 'Quantity');
	console.log('___________________________________________________ \n');

//Initial database query to show current items in stock
	connection.query("SELECT * FROM Products", function(err, data){
		if (err) throw err;

		for(var i = 0; i < data.length; i++){
			console.log(data[i].ItemID + " \t " + data[i].ProductName + " \t\t " + "$"+ data[i].Price+ " \t " +data[i].StockQuantity);
		}
		console.log('\n');

//Prompts the user for input to add items to the database
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

//Query updates the database and adds the new item 
				connection.query('INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity) VALUES( "'  + product + '", "' + department + '", ' + cost + ', ' + quantity+ ')', function(err, data){
					if (err) throw err;

					for(var i = 0; i < data.length; i++){
						console.log(data[i].ItemID + " | " + data[i].ProductName + " | " + "$"+ data[i].Price+ " | " +data[i].StockQuantity);
					}

//Restart allows the prompt to repeat for multiple entries only ends when the user manually exits
					console.log('\n');
					restart();
				});
			
			}
		});

	});
}

function restart(){
	start();
}
 