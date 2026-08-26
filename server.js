import express from "express";
import studentRoute from "./src/routes/studentRoute.js";
import teacherRoute from "./src/routes/teacherRoute.js";
import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";
import assignmentRoute from "./src/routes/assignmentRoute.js";
import classRoute from "./src/routes/classRoute.js";
import { connectDB } from "./src/config/database.js";
import cors from "cors";

const app = express();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", authRoute);
app.use("/api/student", studentRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/user", userRoute);
app.use("/api/class", classRoute);
app.use("/api/assignment", assignmentRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Express server running correctly",
  });
});

app.listen(5000, () => {
  console.log("serving running on port 5000");
});
