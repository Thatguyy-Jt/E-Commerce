const express = require('express');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
const cors = require('cors');
const connectDB = require('./config/db');
const categoryRouters = require("./routers/categoryRouters");
const productRouters = require("./routers/productRouters");
const authRouters = require("./routers/authRouters");
const cartRouter = require("./routers/cartRouters")
const paymentRouters = require("./routers/paymentRouters")



dotenv.config()
connectDB();

app.use(cors({
  origin: ["http://localhost:5173"],
  allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}))

app.use(express.json());
app.use("/upload", express.static("upload"))
app.use("/", categoryRouters)
app.use("/", productRouters)
app.use("/", authRouters)
app.use("/", cartRouter)
app.use("/", paymentRouters)


const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`listening on port ${port}`));