const express = require('express');
const route = express.Router();
const Contact = require('../model/Contact');

//Get
route.get('/',(req, res, next)=>{
   Contact.find()
        .then(contacts =>{
            res.status(200).json({
                message : "All Contacts",
                contacts
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                message : 'Error Occurred',
                error:err
            })
        })

})


//post

route.post('/',(req,res,next)=>{

    const contact = new Contact({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email
    })

    contact.save()
          .then(data=>{
              res.status(201).json({
                  message : 'Contact Added',
                  contact : data
              })
              .catch(err=>{
                console.log(err)
                res.status(500).json({
                    message : 'Error Occurred',
                    error:err
                })
          })
    
})
})


// dynamic routing

//get routing
route.get('/:id',(req,res,next)=>{
    const id = req.params.id
    res.json({
        userid:id
    })
})

// post
route.post('/:id',(req,res,next)=>{
    res.json({
        message:"I am a post route"
        })
})

// put
route.put('/:id',(req,res,next)=>{
    
    res.json({
    message:"I am a put route"
    })
})

route.delete('/:id',(req,res,next)=>{
    res.json({
        message:"I am a delete route"
        })
})


// const contacts = [
//     {name : 'emdad', email: 'emdad@gmail.com'},
//     {name : 'habib', email: 'habib@gmail.com'},
//     {name : 'anam', email: 'anam@gmail.com'},
// ]

module.exports = route
