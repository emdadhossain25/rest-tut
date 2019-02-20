const express = require('express');
const route = express.Router();
const contactController = require('../controllers/contact')
const authenticate = require('../middleware/authenticate')

//Get
route.get('/',contactController.getAllContactController)


//post

route.post('/',authenticate,contactController.postNewContactController)


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
route.put('/:id',authenticate,contactController.editContact)

route.delete('/:id',authenticate,contactController.deleteContact)


// const contacts = [
//     {name : 'emdad', email: 'emdad@gmail.com'},
//     {name : 'habib', email: 'habib@gmail.com'},
//     {name : 'anam', email: 'anam@gmail.com'},
// ]

module.exports = route
