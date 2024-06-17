const express = require('express');
const app = express();
//config express.js

const cors = require('cors');
app.use(cors());

const env = require('dotenv');
env.config();
const port = process.env.PORT;
//config .env file

const Router = require('./routes/IndexRouter');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// middleware for parsing data as an object

const connectToDataBase = require('./configure/config_db');
connectToDataBase();
//mongo database connection configure

app.use('/', Router);
app.listen(port, ()=>{
    console.log(`app listening to http://localhost:${port}...`);
});
//app run