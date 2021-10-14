import Joi from "joi";




export const createAdminUserValidation = (req, res, next) => {
//  server side validation 
    
 
    const schema = Joi.object({
        fname: Joi.string().max(20).alphanum().required(),
        lname: Joi.string().max(20).alphanum().required(),
        email: Joi.string().max(50).email({ minDomainSegments: 2} ).required(),
        password: Joi.string().min(8).required(),
        phone: Joi.string().max(20).required(),
        address: Joi.string().max(100),
        gender: Joi.string().max(6),
        dob: Joi.date(),
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
