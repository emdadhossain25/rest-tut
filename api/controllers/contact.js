const Contact = require('../model/Contact');


// get all the contacts in this method
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

// post all the saving it in the database
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

const getSingleContact = (req,res,next)=>{
    
    let id = req.params.id;
    Contact.findById(id)
    .then(data=>{
        res.status(201).json({
            data
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


 const deleteContact = (req,res,next)=>{
     let id =req.params.id
     Contact.findByIdAndRemove(id)
     .then(result =>{
         res.json({
             message:'Contact Deleted',
             result
         })
     })
     .catch(err=>
     res.status(500).json({
         message: 'Error Occurred',
         err:err
     })
     )
 }

 const editContact = (req,res,next)=>{
     let id = req.params.id
     let updatedContact ={
         name :req.body.name,
         phone:req.body.phone,
         email:req.body.email
     }
     Contact.findByIdAndUpdate(id, {$set:updatedContact})
     .then(contact =>{

        Contact.findById(contact._id)
        .then(newCOntact=>{
            res.json({
                message:'Contact Updated',
                newCOntact
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'error getting the updated message',
                err
            })
        })
     })
     .catch(err=>
        res.status(500).json({
            message: 'Error Occurred',
            err
        })
        )
 }
     
module.exports = {
    getAllContactController,
    postNewContactController,
    getSingleContact,
    deleteContact,
    editContact
}