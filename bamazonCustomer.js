//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');

//create connection to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function (err) {
    console.log("Connected as id: " + connection.threadId);
    start();
})

var start = function () {
    //prints the items for sale and their details
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log(' ');
        console.log('~~~~~~~~~~~~~~~ Welcome to Bamazon ~~~~~~~~~~~~~~~')
        console.log('----------------------------------------------------------------------------------------------------')

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
            console.log('--------------------------------------------------------------------------------------------------')
        }
        console.log(' ');

        inquirer.prompt([{
            name: "idToPurchase",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
        }, {
            name: "quantityToBuy",
            type: "input",
            message: "How many units of the product would you like to buy?"
        }]).then(function (answer) {
            var whatToBuy = (answer.idToPurchase) - 1;
            var howMuchToBuy = parseInt(answer.quantityToBuy);
            var grandTotal = parseFloat(((res[whatToBuy].price) * howMuchToBuy).toFixed(2));

            //check if quantity is sufficient
            if (res[whatToBuy].stock_quantity >= howMuchToBuy) {
                //after purchase, updates quantity in Products
                connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)
                    },
                    {
                        item_id: answer.idToPurchase
                    }
                ], function (err, result) {
                    if (err) throw err;
                    console.log(' ');
                    console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
                    console.log(' ');
                });
            } else {
                console.log(' ');
                console.log("Sorry, there's not enough in stock!");
                console.log(' ');
            }
            restart();
        });
    });
}

//asks if they would like to purchase another item
function restart() {
    inquirer.prompt([{
        name: "restart",
        type: "confirm",
        message: "Would you like to purchase another item?"
    }]).then(function (answer) {
        if (answer.restart) {
            start();
        } else {
            console.log(' ');
            console.log("Thank you, come again!");
        }
    });
}