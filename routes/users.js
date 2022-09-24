var express = require("express");
const { getMaxListeners } = require("../app");
var router = express.Router();
const { mongodb, dbName, dbUrl, MongoClient } = require("../dbConfig");
const client = new MongoClient(dbUrl);

let data = [
  {
    name: "sachin",
    email: "sachin@gmail.com",
    mobile: "2589632547",
  },

  {
    name: "saurabh",
    email: "saurabh@gmail.com",
    mobile: "9856321478",
  },
  {
    name: "dhoni",
    email: "dhoni@gmail.com",
    mobile: "7458963256",
  },

  {
    name: "rahul",
    email: "rahul@gmail.com",
    mobile: "8459632547",
  },
];

/* GET users listing. */
router.get("/request", async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(dbName);
    let requests = await db.collection("app").find().toArray();
    res.send({
      statusCode: 200,
      data: requests,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
});

router.get("/request/:id", async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(dbName);
    let requests = await db
      .collection("app")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    res.send({
      statusCode: 200,
      data: requests,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
});

router.put("/request/:id", async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(dbName);
    let requests = await db.collection("app").updateOne(
      { _id: mongodb.ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          gmail: req.body.gmail,
          number: req.body.mobile,
          amount: req.body.amount,
        },
      }
    );
    res.send({
      statusCode: requests.matchedCount == 1 ? 200 : 400,
      message:
        requests.matchedCount == 1 ? "Data update successfully" : "Invalid Id",
      data: requests,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
});

router.post("/request", async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(dbName);
    let requests = await db.collection("app").insertOne(req.body);
    res.send({
      statusCode: 200,
      message: "Data saved successfuly",
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
});

router.delete("/request/:id", async (req, res) => {
  await client.connect();

  try {
    const db = await client.db(dbName);
    let requests = await db
      .collection("app")
      .deleteOne({ _id: mongodb.ObjectId });
    res.send({
      statusCode: 200,
      message: "Data deleted successfully",
      data: requests,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server error",
    });
  } finally {
    client.close();
  }
});

module.exports = router;
