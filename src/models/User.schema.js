import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: "active",
       
    },
    fname: {
        type: String,
        required: true,
        default: "",
        max: 20
    },
    lname: {
        type: String,
        required: true,
        default: "",
        max: 20
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
        required: true,
        default: "",
        max: 50,
        unique: true,
        index: 1

    },
    isEmailConfirmed: {
        type: Boolean,
        required: true,
        default: false,
        
    },
    phone: {
        type: String,
       
        max: 15,
    },
    password: {
        type: String,
        required: true,
        default: "",
        max: 20,
        min: 8
    },
    address: {
        type: String,
        max: 100
    },
    gender: {
        type: String,
       
    },
    role: {
        type: String,
        required: true,
        default: "user",
        
    },  

},
    {
        timestamps: true,
    }

)

const user = mongoose.model("User", UserSchema);

export default user; 