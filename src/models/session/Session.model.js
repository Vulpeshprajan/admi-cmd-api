import SessionSchema from "./Session.schema.js";
import { randomGenerator } from "../../utils/randomGenerator.js";


// to create a uniq email validation info 
const pinLength = 6
export const createUniqueEmailConfirmation = async email => {

try {
    // generate random 6 digit numbers 
    
    const pin = randomGenerator(pinLength); 
        if (!pin || !email) {
            return false
    
        }
    const newEmailValidation = {
        pin,
        email
        
    }
    const result = await SessionSchema(newEmailValidation).save()
    console.log(result)
    return result

    // store pin with email in session table 
} catch (error) {
    throw new Error(error)
}

}


export const findAdminEmailVerification =async(filterObj) =>  {
try {
    const result = await SessionSchema.findOne(filterObj);
    console.log(result, "from find session model")
    return result

} catch (error) {
    throw new Error(error);
    
}


}


export const deleteInfo = async (filterObj) => {
    try {
        const result =  await SessionSchema.findOneAndDelete(filterObj)
        return result;
    } catch (error) {
        throw new Error(error)
    }

}