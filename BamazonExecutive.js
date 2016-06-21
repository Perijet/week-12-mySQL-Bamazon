var mysql = require('mysql');
var prompt = require('prompt');
var inquirer  = require ('inquirer');
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
console.log(' Welcome to The Bamazon Executive App!');
console.log('Please Select one of the options below!');
console.log('============================================'+ '\n\n');

//Function that starts the program and prompts the user for input based on four choices
function start(){

	inquirer.prompt([

	{
        type: "list",
        message: "Please Select one of the options below",
        choices: ["View Products Sale by Department", "Create New Department"],
        name: "bamazon"
    }

	]).then(function (answer) {


	var choice = answer.bamazon;

	switch (choice){
		case "View Products Sale by Department":
		productSales();
		break;

		case "Create New Department":
		newDepartment();
		break;

		default:
		console.log('choose');
		start();
	}
	});
}
start();

//// function that displays product sales options to the executive in a summarized table
function productSales(){
	console.log('');
	console.log('____________________________________________________________________________________');
	console.log('DepartmentID\t', 'DepartmentName\t\t', 'OverHeadCosts\t', 'ProductSales\t', 'TotalProfit');
	console.log('____________________________________________________________________________________');

//Query to the database that returns custom fields based on a JOIN and custom ALIAS for ProductSales and TortalProfit
	connection.query("SELECT t1.DepartmentID, t2.DepartmentName, t1.OverHeadCosts, t1.TotalSales AS ProductSales, OverheadCosts - TotalSales AS TotalProfit FROM Departments t1 INNER JOIN Products t2 ON t1.DepartmentName = t2.DepartmentName GROUP BY DepartmentID;", function(err, data){
		if (err) throw err;

		for(var i = 0; i < data.length; i++){
			console.log(data[i].DepartmentID + " \t\t " + data[i].DepartmentName + " \t\t " + "$"+ data[i].OverHeadCosts+ " \t\t " +data[i].ProductSales + " \t\t " + data[i].TotalProfit);
		}
		console.log('\n');
		start();
	});


}

//Function to allow executive to add a new department to the existing Departments database
function newDepartment(){

	console.log('');
	console.log('____________________________________________________________________________________');
	console.log('DepartmentID\t', 'DepartmentName\t\t', 'OverHeadCosts\t', 'ProductSales\t', 'TotalProfit');
	console.log('____________________________________________________________________________________');

//Query to displat the existing executive view for reference
	connection.query("SELECT t1.DepartmentID, t2.DepartmentName, t1.OverHeadCosts, t1.TotalSales AS ProductSales, OverheadCosts - TotalSales AS TotalProfit FROM Departments t1 INNER JOIN Products t2 ON t1.DepartmentName = t2.DepartmentName GROUP BY DepartmentID;", function(err, data){
		if (err) throw err;

		for(var i = 0; i < data.length; i++){
			console.log(data[i].DepartmentID + " \t\t " + data[i].DepartmentName + " \t\t " + "$"+ data[i].OverHeadCosts+ " \t\t " +data[i].ProductSales + " \t\t " + data[i].TotalProfit);
		}
		console.log('\n');
	
//Prompts the user for information needed to add the new department
	inquirer.prompt([

		{
	        type: "input",
	        message: "Enter department name?",
	        name: "dName"
	    },

	    {
	        type: "input",
	        message: "Enter Overhead Costs",
	        name: "oCosts"
	    },

	    {
	        type: "input",
	        message: "Enter Total Sales",
	        name: "tSales"
	    }


		]).then(function (answers) {
			
			console.log('\n');
			var department = answers.dName;
			var overhead = answers.oCosts;
			var sales = answers.tSales;

//Query based on input from above used to update the Departments table with a new department
			connection.query('INSERT INTO Departments(DepartmentName, OverHeadCosts, TotalSales) VALUES( "'  + department + '", "' + overhead + '", ' + sales + ')', function(err, data){
				if (err) throw err;

				for(var i = 0; i < data.length; i++){
					console.log(data[i].DepartmentName + " | " + data[i].OverHeadCosts + " | " + "$"+ data[i].TotalSales);
				}
				console.log('\n');
			start();
			});
			

		});

	});


}