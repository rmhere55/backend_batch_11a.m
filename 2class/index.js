require('dotenv').config()
const http = require('http')
const fs = require('fs')
 const os = require('os')

 const  myserver = http.createServer((req ,res )=>{
   //  console.log(req.headers )
 
    if( req.url === "/favicon.ico" )  return res.end();
   const log = `${Date.now()}:${req.url} New request Recived \n`;

   fs.appendFile('log.txt' , log , (err , data)=>{
      switch(req.url){
         case '/':
            res.end("homepage");
            break;
           case '/about':
            res.end("i m RM");
            break;
            default:
               res.end("404 not found");

      }
   });
   //  server side rendring 
            // res.end("homepage");

 })

 myserver.listen(process.env.PROT,()=> console.log("server start"))