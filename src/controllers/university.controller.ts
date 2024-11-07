import { Request, Response } from "express";
import { AppDataSource } from "../data/data-source.js";
import { University } from "../entity/University";

// Get all universities
export const getUniversities = async (req: Request, res: Response) => {
  const universityRepository = AppDataSource.getRepository(University);
  const universities = await universityRepository.find({
    relations: ["departments"],
  });
  res.json(universities);
};

// Create a new university
export const createUniversity = async (req: Request, res: Response) => {
  const { name } = req.body;
  const universityRepository = AppDataSource.getRepository(University);
  const newUniversity = universityRepository.create({ name });
  await universityRepository.save(newUniversity);
  res.status(201).json(newUniversity);
};

// Get university by ID
export const getUniversityById = async (req: Request, res: Response) => {
  const universityRepository = AppDataSource.getRepository(University);
  const university = await universityRepository.findOne({
    where: { id: parseInt(req.params.id) },
    relations: ["departments"],
  });
  if (university) {
    res.json(university);
  } else {
    res.status(404).json({ message: "University not found" });
  }
};

// Update university by ID
export const updateUniversity = async (req: Request, res: Response) => {
  const universityRepository = AppDataSource.getRepository(University);
  let university = await universityRepository.findOneBy({
    id: parseInt(req.params.id),
  });
  if (university) {
    universityRepository.merge(university, req.body);
    const result = await universityRepository.save(university);
    res.json(result);
  } else {
    res.status(404).json({ message: "University not found" });
  }
};

// Delete university by ID
export const deleteUniversity = async (req: Request, res: Response) => {
  const universityRepository = AppDataSource.getRepository(University)};
