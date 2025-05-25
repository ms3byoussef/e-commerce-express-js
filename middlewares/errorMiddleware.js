

const globalError= (err, req, res, next) => {
   
     err.statusCode = err.statusCode || 500;
     err.message = err.message || "Something went wrong";
 
     if (process.env.NODE_ENV==='development')
{
          sendErrorForDev(err, res);
}
else{
     sendErrorForProd(err, res);
}
};

const sendErrorForDev  = (err,res)=>{
     return res.status(err.statusCode).json({ 
          statusCode:err.statusCode,
          error:err,
          message:err.message,
          stack:  err.stack ,
       });
     };

     const sendErrorForProd  = (err,res)=>{
          return res.status(err.statusCode).json({ 
               statusCode:err.statusCode,
               message:err.message,
            });
          };

module.exports = globalError;