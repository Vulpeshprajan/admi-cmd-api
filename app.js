import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";

const app = express();

import helmet from "helmet";

const PORT = process.env.PORT || 8000;

// connect mongoDb
import mongoClient from "./src/config/db.js";
mongoClient(); 

// middlewares
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.urlencoded());
app.use(express.json());



// load routers
import userRouter from "./src/routers/userRouter.js";

// use routers
app.use("/api/v1/user", userRouter)



app.use("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log(`Server is running at http://localhost:${PORT}`);
});
