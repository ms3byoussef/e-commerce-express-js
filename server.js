
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const globalError = require("./middlewares/errorMiddleware");
// const ApiError = require("./utils/apiError");
 
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

// Handle undefined routes
// app.all('*', (req, res, next) => {
//     next(new ApiError(`Can't find this route`, 400));
//   });
  

  
// Global Error Handler
app.use(globalError);   


const PORT=process.env.PORT|| 8000;
app.listen( PORT,()=>{
    console.log(` Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Database: ${process.env.DB_NAME}`);
});
 

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
      console.error(`Shutting down....`);
      process.exit(1);
    });
  });