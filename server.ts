import express from "express";
import authRoutes from "./src/routes/auth";
import eventRoutes from "./src/routes/event";
import resourceRoutes from "./src/routes/resource";
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/resource", resourceRoutes )

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is running on Port : ", PORT);
});
