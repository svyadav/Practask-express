const mongodb = require("mongodb");
const dbName = "b35wee";
const dbUrl =
  "mongodb+srv://sachinyadav:Developer123@sachin.uhlse2y.mongodb.net/test";

const MongoClient = mongodb.MongoClient;

module.exports = { mongodb, dbName, dbUrl, MongoClient };
