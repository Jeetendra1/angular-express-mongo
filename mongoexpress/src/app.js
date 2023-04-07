const express = require('express');
const connectToMongoDB = require('./config/connection'); 
const cors = require('cors');   
const router = require('./route');
const app = express();
const port = process.env.PORT || 9000;

connectToMongoDB();
app.use(cors())
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Connection is setup ${port}`)
})