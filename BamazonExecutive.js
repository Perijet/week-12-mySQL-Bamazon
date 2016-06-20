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


connection.connect(function(err){

	if (err) throw err;

});

console.log('connected as id' + connection.threadId + '\n');
	console.log('============================================');
	console.log(' Welcome to The Bamazon Executive App!');
	console.log('Please Select one of the options below!');
	console.log('============================================'+ '\n\n');

function start(){

inquirer.prompt([

	{
        type: "list",
        message: "Please Select one of the options below",
        choices: ["View Products Sale by Department", "Create New Department"],
        name: "bamazon"
    }

 


	]).then(function (answer) {

//console.log(answer.bamazon);

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

function productSales(){
	console.log('');
	console.log('____________________________________________________________________________________');
	console.log('DepartmentID\t', 'DepartmentName\t\t', 'OverHeadCosts\t', 'ProductSales\t', 'TotalProfit');
	console.log('____________________________________________________________________________________');

	connection.query("SELECT t1.DepartmentID, t2.DepartmentName, t1.OverHeadCosts, t1.TotalSales AS ProductSales, OverheadCosts - TotalSales AS TotalProfit FROM Departments t1 INNER JOIN Products t2 ON t1.DepartmentName = t2.DepartmentName GROUP BY DepartmentID;", function(err, data){
		if (err) throw err;

		for(var i = 0; i < data.length; i++){
			console.log(data[i].DepartmentID + " \t\t " + data[i].DepartmentName + " \t\t " + "$"+ data[i].OverHeadCosts+ " \t\t " +data[i].ProductSales + " \t\t " + data[i].TotalProfit);
		}
		console.log('\n');

	});



// SELECT t1.DepartmentID, t2.DepartmentName, t1.OverHeadCosts, t1.TotalSales AS ProductSales, OverheadCosts - TotalSales AS TotalProfit
// FROM Departments t1
// INNER JOIN Products t2 ON t1.DepartmentName = t2.DepartmentName
// GROUP BY DepartmentID;

}

function newDepartment(){
	console.log('dept');

}