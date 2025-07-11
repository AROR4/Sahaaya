const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const campaignRoutes = require('./routes/campaignRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const db=require('./db');

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api", authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use("/api/user", userRoutes);
app.use("/api/", uploadRoutes);

app.listen(5152, () => console.log("Server running on port 5152"));
