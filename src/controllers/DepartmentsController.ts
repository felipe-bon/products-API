import { Request, Response } from "express";
import { DepartmentRepository } from "../repositories/departmentRepository";
import { productRepository } from "../repositories/productRepository";
import { In } from "typeorm";


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

    async updateDepartment(req: Request, res: Response){
        const { id } = req.params;
        const { name} = req.body;

        try{
            const departmentId = parseInt(id);
            const department = await DepartmentRepository.findOneBy({id: departmentId});

            if(!department){
                return res.status(404).json({message:'Department not found'});
            }

            if(name) department.department_name = name

            await DepartmentRepository.save(department);

            return res.status(200).json(department);

        }catch(error){
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async getDepartment(req: Request, res: Response){
        const { id } = req.params

        try{
            const departmentId = parseInt(id);
            
            const department = await DepartmentRepository.findOneBy({id: departmentId});

            if(!department){
                return res.status(404).json({message:'Department not found'});
            }

            return res.json(department);

        }catch(error){
            console.log(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

    async deleteDepartment(req: Request, res: Response){
            
        const { id } = req.params;

        try{
            const departmentId = parseInt(id);

            const department = DepartmentRepository.findOneBy({id: departmentId});

            if(!department){
                return res.status(404).json({message:'Department not found'});
            }

            await DepartmentRepository.delete(id);

            return res.status(200).json({message:'Department deleted'});

        }catch(error){
            console.log(error);
            return res.status(500).json({message: "Internal server error"});
        }


    }
}