import express from "express";
import authRoutes from "./src/routes/auth";
import eventRoutes from "./src/routes/auth";
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/auth", eventRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is running on Port : ", PORT);
});
