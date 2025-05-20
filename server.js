
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
// Routes
const categoryRoute = require('./routers/categoryRoute');


dotenv.config({ path: 'config.env' });
// express app
const app = express();
app.use(express.json());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
    console.log("Development Mode");
}

dbConnection();

// Mount Routes
app.use("/api/v1/categories", categoryRoute);


const PORT=process.env.PORT|| 8000;
app.listen( PORT,()=>{
    console.log("Server is running on port \${PORT}");
});
 

