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
	console.log('  Welcome to The Bamazon Manager App!');
	console.log('Please Select one of the options below!');
	console.log('============================================'+ '\n\n');
});