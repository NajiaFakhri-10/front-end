import { Request, Response } from ".express-serve-static-core-EwjTyNOT";
import { AppDataSource } from "../data/data-source.js";
import { Department } from "../entity/Department";

// Get all departments
export const getDepartments = async (req: Request, res: Response) => {
  const departmentRepository = AppDataSource.getRepository(Department);
  const departments = await departmentRepository.find({
    relations: ["specializations", "university"],
  });
  res.json(departments);
};

// Create a new department
export const createDepartment = async (req: Request, res: Response) => {
  const { name, university } = req.body;
  const departmentRepository = AppDataSource.getRepository(Department);
  const newDepartment = departmentRepository.create({ name, university });
  await departmentRepository.save(newDepartment);
  res.status(201).json(newDepartment);
};

// Get department by ID
export const getDepartmentById = async (req: Request, res: Response) => {
  const departmentRepository = AppDataSource.getRepository(Department);
  const department = await departmentRepository.findOne({
    where: { id: parseInt(req.params.id) },
    relations: ["specializations", "university"],
  });
  if (department) {
    res.json(department);
  } else {
    res.status(404).json({ message: "Department not found" });
  }
};

// Update department by ID
export const updateDepartment = async (req: Request, res: Response) => {
  const departmentRepository = AppDataSource.getRepository(Department);
  let department = await departmentRepository.findOneBy({
    id: parseInt(req.params.id),
  });
  if (department) {
    departmentRepository.merge(department, req.body);
    const result = await departmentRepository.save(department);
    res.json(result);
  } else {
    res.status(404).json({ message: "Department not found" });
  }
};

// Delete department by ID
export const deleteDepartment = async (req: Request, res: Response) => {
  const departmentRepository = AppDataSource.getRepository(Department);
  const result = await departmentRepository.delete(req.params.id);
  if (result.affected === 1) {
    res.json({ message: "Department deleted" });
  } else {
    res.status(404).json({ message: "Department not found" });
  }
};
