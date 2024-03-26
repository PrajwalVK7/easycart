
require('dotenv').config()
const express = require('express');
const cors = require('cors');


const easymartServer = express();
const routes = require('./Routes/routes')
easymartServer.use(cors());
require('./DB/connection')
 
easymartServer.use(express.json());
easymartServer.use(routes)

const PORT = 5000;

easymartServer.listen(PORT,()=>{
    console.log(`server is up and running in PORT ${PORT}`)
})

easymartServer.get('/',(req,res)=>{
    res.send("Easymart server is running")
})