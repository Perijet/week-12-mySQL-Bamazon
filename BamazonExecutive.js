var mysql = require('mysql');
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
	console.log(' Welcome to The Bamazon Executive App!');
	console.log('Please Select one of the options below!');
	console.log('============================================'+ '\n\n');
});

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
	case "View_Products_for_Sale":
	productSales();
	break;

	case "Create New Department":
	newDepartment();
	break;

	default:
	console.log('choose');
}
});
}
start();

function productSales(){

}

function newDepartment(){

}