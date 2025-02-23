import 'dotenv/config';
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
// At the top with other imports
import ecoActionRoutes from "./routes/ecoActionRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use("/api", ecoActionRoutes);

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB
connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
