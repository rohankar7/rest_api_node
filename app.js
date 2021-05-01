const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const postsRoute = require('./routes/posts');
const uri = process.env.DB_CONNECTION;
const bdParser = require('body-parser');
const cors = require('cors');

// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// Middlewares
app.use(express.urlencoded({extended: true})); 
app.use(express.json());  
app.use(cors());
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log('Connected to DB');
});

// Routes
app.get('/', (req,res)=>{
    res.send("We're on home");
});
app.use('/posts', postsRoute);

app.listen(5000, ()=>{
    console.log("Listening to *5000");
});