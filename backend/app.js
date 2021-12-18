const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const errorMidddleware = require('./middleware/error');
// parsing object to json
app.use(express.json());
app.use(cookieParser())

// import route from productroute
const product = require("./routes/productRoute");
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
// it will give route to product crud operations
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

// middleware for error
app.use(errorMidddleware);


// export app routes to server
module.exports = app