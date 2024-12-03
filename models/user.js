const { name } = require('ejs');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect("mongodb://127.0.0.1:27017/crudapp");

const userSchema = mongoose.Schema({
    image: String,
    email: String,
    name: String
})

module.exports = mongoose.model('user', userSchema);


// const db = function database() {
//     try {
//         const url = mongoose.connect(process.env.DATABASE_URL);
//         console.log('database connected now');

//     }
//     catch (err) {
//         console.log('database is not connected')

//     }
// }

// db();