import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Specialization } from "../entity/Specialization";

// Get all specializations
export const getSpecializations = async (req: Request, res: Response) => {
  const specializationRepository = AppDataSource.getRepository(Specialization);
  const specializations = await specializationRepository.find({
    relations: ["students", "department"],
  });
  res.json(specializations);
};

// Create a new specialization
export const createSpecialization = async (req: Request, res: Response) => {
  const { name, department } = req.body;
  const specializationRepository = AppDataSource.getRepository(Specialization);
  const newSpecialization = specializationRepository.create({ name, department });
  await specializationRepository.save(newSpecialization);
  res.status(201).json(newSpecialization);
};

// Get specialization by ID
export const getSpecializationById = async (req: Request, res: Response) => {
  const specializationRepository = AppDataSource.getRepository(Specialization);
  const specialization = await specializationRepository.findOne({
    where: { id: parseInt(req.params.id) },
    relations: ["students", "department"],
  });
  if (specialization) {
    res.json(specialization);
  } else {
    res.status(404).json({ message: "Specialization not found" });
  }
};

// Update specialization by ID
export const updateSpecialization = async (req: Request, res: Response) => {
  const specializationRepository = AppDataSource.getRepository(Specialization);
  let specialization = await specializationRepository.findOneBy({
    id: parseInt(req.params.id),
  });
  if (specialization) {
    specializationRepository.merge(specialization, req.body);
    const result = await specializationRepository.save(specialization);
    res.json(result);
  } else {
    res.status(404).json({ message: "Specialization not found" });
  }
};

// Delete specialization by ID
export const deleteSpecialization = async (req: Request, res: Response) => {
  const specializationRepository = AppDataSource.getRepository(Specialization);
  const result = await specializationRepository.delete(req.params.id);
  if (result.affected === 1) {
    res.json({ message: "Specialization deleted" });
  } else {
    res.status(404).json({ message: "Specialization not found" });
  }
};
