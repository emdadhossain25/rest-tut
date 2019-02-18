const express = require('express');
const route = express.Router();
const contactController = require('../controllers/contact')

//Get
route.get('/',contactController.getAllContactController)


//post

route.post('/',contactController.postNewContactController)


// dynamic routing

//get routing
route.get('/:id',contactController.getSingleContact)


// post
route.post('/:id',(req,res,next)=>{
    res.json({
        message:"I am a post route"
        })
})

// put
route.put('/:id',contactController.editContact)

route.delete('/:id',contactController.deleteContact)


// const contacts = [
//     {name : 'emdad', email: 'emdad@gmail.com'},
//     {name : 'habib', email: 'habib@gmail.com'},
//     {name : 'anam', email: 'anam@gmail.com'},
// ]

module.exports = route
