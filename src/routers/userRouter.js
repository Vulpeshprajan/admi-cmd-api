import express from "express";

const Router = express.Router()
import { createUser } from "../models/User.models.js";
import { createAdminUserValidation } from "../middlewares/formValidation.middleware.js";
import {hashPassword  } from "../helpers/bcrypt.helper.js";

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

        const result = await createUser(req.body)

        if (result?._id) {
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


export default Router; 