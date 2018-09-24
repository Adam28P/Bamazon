//require mysql and inquirer
var mysql = require('mysql');
// var inquirer = require('inquirer');

//create connection to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function(err){
    console.log("Connected as id: " + connection.threadId);
    start();
})

function start() {
    //prints the items for sale and their details
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log('~~~~~~~~~~~~~~~ Welcome to Bamazon ~~~~~~~~~~~~~~~')
        console.log('----------------------------------------------------------------------------------------------------')

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
            console.log('--------------------------------------------------------------------------------------------------')
        }
        console.log(' ');

    });
}