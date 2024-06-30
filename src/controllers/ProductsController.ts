import { Request, Response } from "express";
import { productRepository } from "../repositories/productRepository";
import { DepartmentRepository } from "../repositories/departmentRepository";
import { In } from "typeorm";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";

export class ProductController {
    
    async create(req: Request, res: Response) {
        const { name, description, barcode, price, departmentIds } = req.body;

        if (!name || !departmentIds || departmentIds.length === 0) {
            throw new BadRequestError('Name and at least one departmentId are required')
        }

        const departments = await DepartmentRepository.findByIds(departmentIds);
        if (departments.length !== departmentIds.length) {
            throw new NotFoundError('One or more departments not found')
        }

        const newProduct = productRepository.create({
            name,
            description,
            barcode,
            price,
            departments
        });
        

        await productRepository.save(newProduct);

        return res.status(201).json(newProduct);
    }

    async getAll(req: Request, res: Response){
        
        const products = await productRepository.find()
        return res.status(200).json(products);
    }

    async getProduct(req: Request, res: Response){
        const { id } = req.params;

        const productId = parseInt(id);

        const product = await productRepository.findOneBy({id: productId});
        
        if(!product){
            throw new NotFoundError('Product not found')
        }

        return res.status(200).json(product)

    }


    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, barcode, price, departmentIds } = req.body;

        const productId = parseInt(id);
        const departmentIdsInt = departmentIds.map((i: { id: string; }) => parseInt(i.id));

        const product = await productRepository.findOne({
            where: { id: productId },
            relations: ["departments"]
        });

        if(!product){
            throw new NotFoundError('Product not found')
        }

        // verifica se os deparments existem.

        const departments = await DepartmentRepository.findBy({
            id: In (departmentIdsInt)
        })

        
        if(!departments || (Object.values(departments)).length != departmentIdsInt.length){
            throw new NotFoundError('One or more departments not found')
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (barcode) product.barcode = barcode;
        if (price) product.price = price;
        product.departments = departments;

        await productRepository.save(product);

        return res.status(200).json(product);

    }


    async getProductsByDepartment(req: Request, res: Response) {
        const { departmentName } = req.params;

        const department = await DepartmentRepository.findOne({ relations: ['products'], where: { department_name: departmentName } });
        if (!department) {
            throw new NotFoundError('Department not found')
        }

        return res.json(department.products);
    }

    async deleteProduct(req: Request, res: Response){

        const { id } = req.params
        
        const productId = parseInt(id)
        const product = await productRepository.findOneBy({id: productId});

        if (!product){
            throw new NotFoundError('Product not nound')
        }

        await productRepository.delete(id)

        return res.status(200).json({message:'Product deleted'});
    }
}