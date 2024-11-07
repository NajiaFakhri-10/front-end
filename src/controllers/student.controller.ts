import { Request, Response } from "express";
import { Student } from "../entity/Student"; // Ensure this path is correct for your project setup
import { getRepository } from "typeorm";

// Get all students
export const getStudents = async (req: Request, res: Response) => {
  const students = await getRepository(Student).find();
  res.json(students);
};

// Create a new student
export const createStudent = async (req: Request, res: Response) => {
  const newStudent = getRepository(Student).create(req.body);
  const result = await getRepository(Student).save(newStudent);
  res.json(result);
};

// Get a student by ID
export const getStudentById = async (req: Request, res: Response) => {
  const student = await getRepository(Student).findOne(req.params);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
};

// Update a student
export const updateStudent = async (req: Request, res: Response) => {
  const student = await getRepository(Student).findOne(req.params);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  getRepository(Student).merge(student, req.body);
  const result = await getRepository(Student).save(student);
  res.json(result);
};

// Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
  const result = await getRepository(Student).delete(req.params.id);
  res.json(result);
};
