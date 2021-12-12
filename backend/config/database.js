const mongoose = require('mongoose')
// connnects to database 
// update required
const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }).then((data) => {
        console.log(`mongodb connected with server: ${data.connection.host}`);
    })
}
module.exports = connectDatabase