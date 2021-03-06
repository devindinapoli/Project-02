var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// Serve static server for content in public directory
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Set up Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.

require("./routes/school-api-routes.js")(app);
require("./routes/student-api-routes.js")(app);
require("./routes/html-routes.js")(app);

var db = require("./models");

db.sequelize.sync().then(function(){
  app.listen(process.env.PORT || 8080)
  }); 

