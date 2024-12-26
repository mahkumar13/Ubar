const mongoose = require('mongoose');


const connectToDB = () => {
    mongoose.connect('mongodb://localhost/mydatabase',)
        .then(() => console.log('MongoDB Connected...'))
}

module.exports = connectToDB;