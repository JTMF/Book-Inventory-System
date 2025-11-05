require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require("./routes/user")
const transactionRoutes = require("./routes/transactions")
const stockTakeRoutes = require("./routes/stockTake")

app.use("/api/user", userRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/stocktake", stockTakeRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port", process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })