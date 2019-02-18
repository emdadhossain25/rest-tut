const Contact = require('../model/Contact');

const getAllContactController = (req,res, next)=>{
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
    
}


const postNewContactController = (req, res,next)=>{
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
}


module.exports = {
    getAllContactController,
    postNewContactController
}