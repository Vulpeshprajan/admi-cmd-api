import express from "express";

const Router = express.Router()
import { createUser, verifyEmail } from "../models/User.models.js";
import { adminEmailVerificationValidation, createAdminUserValidation } from "../middlewares/formValidation.middleware.js";
import {hashPassword  } from "../helpers/bcrypt.helper.js";
import { createUniqueEmailConfirmation, deleteInfo, findAdminEmailVerification } from "../models/session/Session.model.js";
import { sendEmailVerificationConfirmation, sendEmailVerificationLink } from "../helpers/email.helper.js";
import e from "express";

Router.all("/", (req, res, next) => {
    console.log("from user router");

    next(); 

})

Router.post("/", createAdminUserValidation, async (req, res) => {
    try {
        // server side validation should be done at first before any data insertion  
        // createAdminUserValidation
        
        
        // encrypt password
        const hashPass = hashPassword(req.body.password)
       
        if (hashPass) {
            
            req.body.password = hashPass

        const {_id, fname, email} = await createUser(req.body)

            if (_id) {
            
                // create unique activation link
                const {pin} = await createUniqueEmailConfirmation(email)
                
             
            if (pin) {
                // email the link to user email 
                
                const forSendingEmail = {
                    fname,
                    email,
                    pin
                };
                    sendEmailVerificationLink(forSendingEmail)
                
                }

              
                
            return res.json({
                status: "success",
                message: "New user has been created successfully! We have send a email confirmation to your email, please check and follow the link to activate account"
            })
        }

        res.json({
            status: "error",
            message: "Unable to create new user  "
        })
    }

    } catch (error) {
        let msg = "Error, Unable to create new user" 
        console.log(error.message)
        if (error.message.includes("E11000 duplicate key error collection")) {
            
            msg= "This email is already exits in database, please try with different user"
        }
        res.json({
            status: "error",
            message: msg
        })

        
    }



})


// email verification 
Router.patch("/email-verification", adminEmailVerificationValidation, async (req, res) => {
    try {
    
        const result = await findAdminEmailVerification(req.body)

        if (result?._id) {
            // Todo 
            // information is valide now we can update the user 

            const data = await verifyEmail(result.email)
            console.log(data, "from verify email")
            if (data?._id) {
                
                // delete the session info 
                deleteInfo(req.body)
                
                
                // send email to confirmation  to user 
                sendEmailVerificationConfirmation({
                    fname: data.fname,
                    email: data.email
                });
                return res.json({
                    status: "success",
                    message: "Your email has been verified, you may login  now "
                })

            }
        }
        
            res.json({
                status: "error",
                message: " Unable to verify email, either the link is invalid or expired"
            })
        
    
} catch (error) {
    res.json({
        status: "error",
        message: "Error, Unable to verify email, please try again later"
    })
}


})

export default Router; 