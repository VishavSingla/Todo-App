const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

module.exports = async () => {

    try {
        const mongouri = process.env.MONGO_URL;
        const connect = await mongoose.connect(mongouri);
        console.log(`MongoDB connected: ${connect.connection.host}`)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}