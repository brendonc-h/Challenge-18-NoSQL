const { connect, connection } = require("mongoose");
require("dotenv").config();

//so that node will use this enviroment instead of just local server

const connectString = 
process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
 module.exports = connection;