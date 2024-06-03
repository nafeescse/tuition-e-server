require('dotenv').config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require("cors");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const tuitionDB = client.db("tuitionDB");
    const tuitionCollection = tuitionDB.collection("tuitionCollection");


    app.post('/recipes', async (req,res) => {
        const recipeData = req.body;
        const result = await tuitionCollection.insertOne(recipeData);
        res.send(result);
    })


    app.get('/recipes', async (req,res) => {
        const recipeData = tuitionCollection.find();
        const result = await recipeData.toArray();
        res.send(result);
    })

    app.get('/recipes/:id', async (req,res) => {
        const id = req.params.id;
        const recipeData = await tuitionCollection.findOne({ _id: new ObjectId(id)});
        res.send(recipeData);
    })


    app.patch('/recipes/:id', async (req,res) => {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await tuitionCollection.updateOne(
            { _id: new ObjectId(id)},
             {$set: updatedData}
            );
        res.send(result);
    })


    app.delete('/recipes/:id', async (req,res) => {
        const id = req.params.id;
        const result = await tuitionCollection.deleteOne(
            { _id: new ObjectId(id)});
        res.send(result);
    })


    console.log("DATABASE is connected");
  } finally {
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Routw is working");
});

app.listen(port, (req,res) => {
        console.log("app is listening on port : ", port);
    });




    // abdur17
    // ouLA4TQxmKc3VkkK