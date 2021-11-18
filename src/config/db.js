import mongoose from "mongoose";

const mongoClient = async () => {
    try {
      
        if(!process.env.MONGO_CLIENT) {
        return console.log("MONGO_CLIENT is not defined, please create MONGO_CLIENT and provide mongoDB connection string")
    }


        const con = await mongoose.connect(process.env.MONGO_CLIENT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    });
    if (con) {
        return console.log("mongoDB is connected");
    }
    console.log("fail to connect mongoDB")
} catch (error) {
    console.log(error)
    
}

}

export default mongoClient;