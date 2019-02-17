const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoute = require('./api/routes/contact')
// console.log(express)


mongoose.connect('mongodb://localhost/restapi')
const db = mongoose.connection;


db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('Database Connection Established')
})


const app = express()

app.use(morgan('dev'));
app.use(cors())
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`server is running at port number: ${PORT}`)
})


app.use((req,res,next)=>{
    console.log('I am a middleware function');
    next();
})



app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.use('/api/contacts',contactRoute)


