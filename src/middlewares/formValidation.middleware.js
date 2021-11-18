import Joi from "joi";

const shortStr = Joi.string().max(20).alphanum().required();
const email = Joi.string().max(50).email({ minDomainSegments: 2 }).required();

export const createAdminUserValidation = (req, res, next) => {
//  server side validation 
    
 
    const schema = Joi.object({
        fname: Joi.string().max(20).alphanum().required(),
        lname: Joi.string().max(20).alphanum().required(),
        email: email, 
        password: Joi.string().min(8).required(),
        phone: Joi.string().max(20).required(),
        address: Joi.string().max(100).allow(""),
        gender: Joi.string().max(6).allow(""),
        dob: Joi.date().allow(null).allow(""),
})

    
    const value = schema.validate(req.body)
    

    if (value.error) {
        return res.json({
            status: "Error",
            message: value.error.message,

        })

    }

    next();

}


export const adminEmailVerificationValidation = (req, res, next) => {


    const schema = Joi.object({
     
        email: email,
        pin: Joi.string().min(6).required(),
     
})

    
    const value = schema.validate(req.body)
    

    if (value.error) {
        return res.json({
            status: "Error",
            message: value.error.message,

        })

    }

    next();



}
