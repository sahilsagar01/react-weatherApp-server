require("dotenv").config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());


const port = 5004;

mongoose.connect("mongodb://localhost:27017/weatherDB")


app.use("/card" , require("./routes/cardRoutes"));

app.listen(port, () => {
    console.log(`server is started on port ${port}`)
})
