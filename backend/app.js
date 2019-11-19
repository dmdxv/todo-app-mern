var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cors = require("cors");
var fileUpload = require("express-fileupload");

var mongoDB = "mongodb://127.0.0.1:27017/agenda";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var indexRouter = require("./routes/index");

var app = express();

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(fileUpload());

app.use("/", indexRouter);

app.listen(3002);
