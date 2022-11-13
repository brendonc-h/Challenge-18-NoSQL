const { connect, connection } = require("mongoose");
require("dotenv").config();

//so that node will use this enviroment instead of just local server

const connectString = 
process.env.MONGODB_URI || process.env.DB_URI;

connect(connectString, {
    useNewUserParser: true,
    useUnifiedTopology: true,
});
 module.exports = connection;