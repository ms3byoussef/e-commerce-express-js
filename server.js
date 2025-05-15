
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config("config.env")

const app = express();
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
    console.log("Development Mode");
}


const uri = "mongodb+srv://ms3byoussef:<db_password>@e-commerce-node-js.b3g99rn.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerce-node-js";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello World!");
});


const PORT=process.env.PORT;
app.listen( PORT,()=>{
    console.log("Server is running on port ${PORT}");
});
 

