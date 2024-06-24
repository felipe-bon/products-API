import { Request, Response } from "express";
import { DepartmentRepository } from "../repositories/departmentRepository";


export class DepartmentController{
    async create(req: Request, res: Response){

        const {department_name} = req.body
        const {department_id} = req.params
        
        try{

            const newDepartment = DepartmentRepository.create({department_name})
            await DepartmentRepository.save(newDepartment)

            return res.status(201).json(newDepartment)

        } catch(error){
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }

    }

    async getAll(req: Request, res: Response){


        try{

            const departments = await DepartmentRepository.find();
            return res.status(200).json(departments)

        }catch(error){
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }

    }


}