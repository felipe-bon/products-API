import { Request, Response } from "express";
import { DepartmentRepository } from "../repositories/departmentRepository";
import { productRepository } from "../repositories/productRepository";
import { In } from "typeorm";
import { NotFoundError } from "../helpers/api-errors";


export class DepartmentController{
    async create(req: Request, res: Response){

        const {department_name} = req.body
        
        const newDepartment = DepartmentRepository.create({department_name})
        await DepartmentRepository.save(newDepartment)

        return res.status(201).json(newDepartment)
    }

    async getAll(req: Request, res: Response){

        const departments = await DepartmentRepository.find();
        return res.status(200).json(departments)
    }

    async updateDepartment(req: Request, res: Response){
        const { id } = req.params;
        const { name} = req.body;

        const departmentId = parseInt(id);
        const department = await DepartmentRepository.findOneBy({id: departmentId});

        if(!department){
            throw new NotFoundError('Department not found')
        }

        if(name) department.department_name = name

        await DepartmentRepository.save(department);

        return res.status(200).json(department);

    }

    async getDepartment(req: Request, res: Response){
        const { id } = req.params

        const departmentId = parseInt(id);
            
        const department = await DepartmentRepository.findOneBy({id: departmentId});

        if(!department){
            throw new NotFoundError('Department not found')
        }

        return res.json(department);

    }

    async deleteDepartment(req: Request, res: Response){
            
        const { id } = req.params;
        const departmentId = parseInt(id);
        const department = DepartmentRepository.findOneBy({id: departmentId});

        if(!department){
            throw new NotFoundError('Department not found')
        }

        await DepartmentRepository.delete(id);

        return res.status(200).json({message:'Department deleted'});
    }
}