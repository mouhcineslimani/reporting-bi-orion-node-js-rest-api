const ChartDao = require("./chart-dao");
const mysql = require("mysql");

class ChartDaoMysql extends ChartDao {
  constructor() {
    super();
    let params = {
      host: "localhost",
      database: "orion",
      user: "root",
      password: "",
    };
    this.db = mysql.createConnection(params);
    this.db.connect((err) => {
      if (err) console.log("Erreur : " + err.message);
      else console.log("Connection is etablished.");
    });
  }

  select(callback) {
    let query =
      "SELECT `product_dim`.`Product_Name`, `order_fact`.`Total_Retail_Price`, `product_dim`.`Supplier_Name`, sum(`order_fact`.`Quantity`) as `Quantity`, sum(`order_fact`.`Total_Retail_Price`) as `Price`, count(`customer_dim`.`Customer_ID`) as `Nbre customers` FROM `customer_dim` INNER JOIN `order_fact` ON `customer_dim`.`Customer_ID` = `order_fact`.`Customer_ID` INNER JOIN `product_dim` ON `order_fact`.`Product_ID` = `product_dim`.`Product_ID` GROUP BY `product_dim`.`Product_Name` ORDER BY sum(`order_fact`.`Quantity`) DESC limit 10;";
    this.db.query(query, (err, result, fields) => {
      if (err) console.log("Erreur :" + err.message);
      else {
        callback({
          data: result,
          fields: fields.map((field) => field.name), // tableau des objets
        });
      }
    }); // on peut y mettre n'importe quelle MLD
  }
}

module.exports = new ChartDaoMysql();
