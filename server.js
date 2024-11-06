import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5353;
const uri = process.env.URI;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Error connecting to MongoDB", error));

const mySchema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true, 
    },
    email: {
      type: String,
      required: true,
    }
  },
);

const MyModel = mongoose.model("homebiro", mySchema);

app.get("/", async (req, res) => {
    try{
        const allUsers = await MyModel.find();
        res.json(allUsers)
    }
    catch(error){
        res.json(error)
    }
})

const hello = {
    fullname: "Joseph",
    email: "adenusijoseph0@gmail.com",
}

app.post("/store", async (req, res) => {
    try{
        const { fullname, email } = req.body;
        const saveUser = await MyModel.create({
            name: fullname,
            email: email,
        })
        res.send("Added successfully");
    }
    catch(error){
        res.send(error);
    }
})

app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
})