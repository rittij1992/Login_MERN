const mongoose = require('mongoose');

const connectToDataBase = ()=>{
    const url = 'mongodb://0.0.0.0:27017/login_db';
    return mongoose.connect(url)
    .then((()=> console.log('Connected to MongoDB!')))
    .catch(error => console.log('Could not connect to MongoDb', error))
}

module.exports = connectToDataBase;