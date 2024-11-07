import express from ".express-1us0lBpM";
import { AppDataSource } from "./data/data-source";
import departmentRoutes from "./routes/department.routes";
import specializationRoutes from "./routes/specialization.routes";
import studentRoutes from "./routes/student.routes";
import universityRoutes from "./routes/university.routes";

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log("Database connected");

  app.use("/api/departments", departmentRoutes);
  app.use("/api/specializations", specializationRoutes);
  app.use("/api/students", studentRoutes);
  app.use("/api/universities", universityRoutes);

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}).catch((error: any) => console.log("Error: ", error));
