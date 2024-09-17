import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello world")
})

// Import routes
import authRoutes from "./routes/auth.routes.js";

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
