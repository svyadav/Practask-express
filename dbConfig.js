const mongodb = require("mongodb");
const dbName = "CRUD";
const dbUrl =
  "mongodb+srv://sachinyadav:Developer123@sachin.uhlse2y.mongodb.net/?retryWrites=true&w=majority";
const MongoClient = mongodb.MongoClient;

module.exports = { mongodb, dbName, dbUrl, MongoClient };
