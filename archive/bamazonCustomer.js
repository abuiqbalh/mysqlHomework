var mysql = require("mysql");
var inquirer = require("inquirer");
var itemAvailable;
var itemList=[];
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
 // start();
})

console.log("======================Items Available for Sale================================ ");

connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log(results); 
    itemAvailable=results;
   //console.log("test"+itemAvailable);
    userInput();
})

function userInput(){

inquirer
      .prompt([
        {
          type: "input",
          name: "id",
          message: "What is the ID of the product you want to buy?"
        },
        {
          type: "input",
          name: "quantity",
          message: "How much would you like to buy?"
        }
      ])
      .then(function(answer) {
      // var productId=answer.id;
      // var productQuantity=answer.quantity;

     // console.log("test"+itemAvailable.item_id);

      

      for (i in itemAvailable){
        //console.log("test"+itemAvailable[i].item_id);
        itemList.push(itemAvailable[i].item_id);
        // if(answer.id===itemAvailable[i].item_id){
        //   console.log("Sorry This Item is not available");
        // }
      } 

      if(itemList.indexOf(answer.id)===false){
        return console.log("Sorry This Item is not available");
      
      }

      //console.log(itemList);

      //console.log(answer.id,answer.quantity);
      var query = "SELECT  product_name, stock_quantity FROM products WHERE ?";
      connection.query(query, { item_id: answer.id }, function(err, res){
      console.log(res);
      var stockQuantity=res[0].stock_quantity;
      console.log(stockQuantity);

      if (answer.quantity<stockQuantity){
        //var quantitySold="select product_name from products where product_id=answer.id"
        console.log("You have bought: "+res[0].product_name);
        quantityAvailable=res[0].stock_quantity-answer.quantity;
        //console.log(quantityAvailable);
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: quantityAvailable
            },
            {
              item_id: answer.id
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("Product Quantity successfully Updated");
            
          }
        );




     

      }

      else {
        
        console.log("Sorry Your requested quantity is not available")
      }


      })
    

        
    })
}