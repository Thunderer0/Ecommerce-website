const express = require('express');
const app = express();
const errorMidddleware = require('./middleware/error')
// parsing object to json
app.use(express.json());


// import route from productroute
const product = require("./routes/productRoute");
// it will give route to product crud operations
app.use("/api/v1",product);

// middleware for error
app.use(errorMidddleware);


// export app routes to server
module.exports = app