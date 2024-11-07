import "reflect-metadata";
import { DataSource } from "typeorm";
import { Department } from "../entity/Department";
import { Specialization } from "../entity/Specialization";
import { Student } from "../entity/Student";
import { University } from "../entity/University";

// Create the AppDataSource
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",   // or your actual host, e.g., a cloud provider
  port: 5432,          // Postgres default port, modify if using a different port
  username: "your_db_username",
  password: "your_db_password",
  database: "university_db",
  synchronize: true,
  logging: false,
  entities: [Department, Specialization, Student, University],
  migrations: [],
  subscribers: [],
});
import 'tsconfig-paths/register';

