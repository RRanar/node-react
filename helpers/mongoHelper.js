const mongoose = require("mongoose");
const config = require("config");

async function connect(){
    try {
        await mongoose.connect(
            config.get("dbUrl"),
            {
                useNewUrlParser:true,
                useUnifiedTopology: true,
                useCreateIndex:true
            }
        );
    } catch (e) {
        console.error(`Some error was occured when connect to db:${e.message}`)
        process.exit(1);
    }
}


module.exports = connect;