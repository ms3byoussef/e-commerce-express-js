
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const  mongoose = require("mongoose");

dotenv.config("config.env")

const app = express();
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
    console.log("Development Mode");
}


mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err.message);
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});


const PORT=process.env.PORT;
app.listen( PORT,()=>{
    console.log("Server is running on port ${PORT}");
});
 

