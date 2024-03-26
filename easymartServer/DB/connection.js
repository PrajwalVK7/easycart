const mongoose = require('mongoose');

const connectionString = process.env.DATA_BASE;


mongoose.connect(connectionString).then((res)=>{
    console.log("MongodB connected ")
}).catch((err)=>{
    console.log(`mongodB connection failed : ${err}`)
})