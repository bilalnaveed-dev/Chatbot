import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// using middleware
app.use(express.json());
app.use(cors());

//importing routes
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

//using routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// Basic route to check server is working or not
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is working on port ${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });
