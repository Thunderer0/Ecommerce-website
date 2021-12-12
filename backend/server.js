// import app
const app = require("./app")
const dotenv = require("dotenv")
const connectDatabase = require('./config/database')
// handeling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`error: ${err.message}`);
    console.log("shutting down server due to uncaughtException");
    server.close(()=>{
        process.exit(1);
    })
})
// config
dotenv.config({path:"backend/config/config.env"})

//  connect database
connectDatabase()

// takes routes from app and listens on port
const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})
// unhandeled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`error: ${err.message}`);
    console.log("shutting down server due to unhandeled prmise rejection");
    server.close(()=>{
        process.exit(1);
    })
})