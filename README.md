<h1>Bamazon</h1>
<h3>Bamazon is an ebay-like store that will take in orders from customers and deplete stock from the store's inventory.</h3>

<h2>Getting Started</h2>
<ul>
<li>Clone the repository to your computer</li>
<li>Run command 'npm install'</li>
<li>Run command 'npm install mysql'</li>
<li>Run command 'node bamazonCustomer.js' or 'node bamazonManager.js'</li>
</ul>

<h2>What Each JavaScript File Does</h2>
<ol>
<strong><li>bamazonCustomer.js</li></strong>
<ul>
<li>Shows the following menu to the user:</li>
<ul>
<li>What is the ID of the item you would like to buy?</li>
<li>How may units of the product would you like to buy?</li>
</ul>
</ul>
<br />
   Once the user has placed their order, the application checks if the store has enough of the product to meet the user's request. If there isn't enough product, the app will prevent the order from going through. However, if the store does have enough of the product, the user's order will be fulfilled.
   <br />
   <br />
   <h3><strong>Video Demo:</strong> <a href="#">Video demo URL here</a></h3>
 <hr />
<strong><li>bamazonManager.js</li></strong>
<ul>
<li>Shows the following menu to the user:</li>
<ul>
<li>View products for sale</li>
<li>View low inventory</li>
<li>Add to inventory</li>
<li>Add new product</li>
</ul>
</ul>
<br />
If the user selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities. If the user selects `View Low Inventory`, then it should list all items with an inventory count lower than five. If the user selects `Add to Inventory`, your app should display a prompt that will let the user  "add more" of any item currently in the store. If the user selects `Add New Product`, it should allow the user to add a completely new product to the store.
<br />
<br />
<h3><strong>Video Demo:</strong> <a href="#">Video demo URL here</a></h3>
</ol>
<hr />
<h3>Have fun!</h3>