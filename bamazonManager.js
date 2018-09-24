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
    inquirer.prompt([{
        name: "managerOptions",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "End Session"]
    }]).then(function (answer) {
        switch (answer.managerOptions) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            case "End Session":
                console.log(' ');
                console.log('Have a great day!');
                process.exit(-1);
        }
    });
}

// function to view all current products for sale
function viewProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log(' ');
        console.log('~~~~~~~~~~~~~~~ List of Products for Sale ~~~~~~~~~~~~~~~')
        console.log('----------------------------------------------------------------------------------------------------')

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
            console.log('--------------------------------------------------------------------------------------------------')
        }
        console.log(' ');
        start();
    });
}

// function to view low inventory products
function viewLowInventory() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (err, res) {
        if (err) throw err;

        if (res.length > 0) {
            console.log(' ');
            console.log('~~~~~~~~~~~~~~~ Products with lower than 5 stock ~~~~~~~~~~~~~~~')
            console.log('----------------------------------------------------------------------------------------------------')

            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
                console.log('--------------------------------------------------------------------------------------------------')
            }
            console.log(' ');
            start();
        } else {
            console.log(' ');
            console.log('There are currently no products with an inventory lower than 5.');
            console.log(' ');
            start();
        }
    });
}

// function to add more of a quantity of a specific product
function addToInventory() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        var itemArray = [];

        //pushes each item into an itemArray
        for (var i = 0; i < res.length; i++) {
            itemArray.push(res[i].product_name);
        }

        inquirer.prompt([{
            name: "addInventoryToProduct",
            type: "list",
            choices: itemArray,
            message: "Which item would you like to add inventory to?"
        }, {
            name: "stockToAdd",
            type: "input",
            message: "How much stock would you like to add to this item?"
        }]).then(function (answer) {
            var currentQuantity;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.addInventoryToProduct) {
                    currentQuantity = res[i].stock_quantity;
                }
            }
            connection.query('UPDATE products SET ? WHERE ?', [{
                    stock_quantity: currentQuantity + parseInt(answer.stockToAdd)
                },
                {
                    product_name: answer.addInventoryToProduct
                }
            ], function (err, res) {
                if (err) throw err;
                console.log(' ');
                console.log('The quantity was updated. You have added ' + answer.stockToAdd + ' stock to ' + answer.addInventoryToProduct + '.');
                console.log(' ');
                start();
            });
        });
    });
}

// function to allow manager to add a completely new product to store
function addNewProduct() {

    inquirer.prompt([{
        name: "newProductName",
        type: "input",
        message: "New product name:"
    }, {
        name: "departmentName",
        type: "input",
        message: "Department item belongs to:"
    }, {
        name: "priceOfItem",
        type: "input",
        message: "Price of the item:"
    }, {
        name: "quantityOfItem",
        type: "input",
        message: "Quantity of the item:"
    }]).then(function (answer) {
        connection.query('INSERT INTO products SET ?', {
            product_name: answer.newProductName,
            department_name: answer.departmentName,
            price: answer.priceOfItem,
            stock_quantity: answer.quantityOfItem
        }, function (err, res) {
            if (err) throw err;
            console.log(' ');
            console.log(answer.newProductName + ' was added to the store.');
            console.log(' ');
            start();
        })
    });

}