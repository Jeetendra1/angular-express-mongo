const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017/schooldb';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/schooldb');
        console.log('Conected to db succesfully...');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectToMongoDB;