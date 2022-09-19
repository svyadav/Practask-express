var express = require("express");
var router = express.Router();

const { mongodb, dbName, dbUrl, MongoClient } = require("../dbConfig");
const client = new MongoClient(dbUrl);

let data = [
  {
    name: "Sachin",
    gmail: "sachin@gmail.com",
    number: "7796523658",
    amount: 100000,
  },
  {
    name: "Saurabh",
    gmail: "saurabh@gmail.com",
    number: "7798547856",
    amount: 200000,
  },
  {
    name: "rahul",
    gmail: "rahul@gmail.com",
    number: "7875142696",
    amount: 300000,
  },
];

/* GET users listing. */
router.get("/request", async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(dbName);
    let requests = await db.collection("leads").find().toArray();
    res.send({
      statusCode: 200,
      data: requests,
    });
  } catch (error) {
    console.log(error);
    req.send({
      statusCode: 500,
      message: "Internal server error",
      error,
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
      .collection("leads")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    res.send({
      statusCode: 200,
      data: requests,
    });
  } catch (error) {
    console.log(error);
    req.send({
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  } finally {
    client.close();
  }
});

router.post("/request", async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(dbName);
    let requests = await db.collection("leads").insertOne(req.body);
    res.send({
      statusCode: 200,
      message: "Data saved successfully",
    });
  } catch (error) {
    console.log(error);
    req.send({
      statusCode: 500,
      message: "Interna server error",
      error,
    });
  } finally {
    client.close();
  }
});

router.put("/request/:id", async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(dbName);
    let requests = await db.collection("leads").updateOne(
      { _id: mongodb.ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          gmail: req.body.gmail,
          number: req.body.number,
          amount: req.body.purpose,
        },
      }
    );
    res.send({
      statusCode: requests.matchedCount == 1 ? 200 : 400,
      message:
        requests.matchedCount == 1 ? "Data updated successfully" : "Invalid ID",
      data: requests,
    });
  } catch (error) {
    console.log(error);
    req.send({
      statusCode: 500,
      message: "Interna server error",
      error,
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
      .collection("leads")
      .deleteOne({ _id: mongodb.ObjectId(req.params.id) });
    res.send({
      statusCode: 200,
      message: "Data updated successfully",
      data: requests,
    });
  } catch (error) {
    console.log(error);
    req.send({
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  } finally {
    client.close();
  }
});

module.exports = router;
