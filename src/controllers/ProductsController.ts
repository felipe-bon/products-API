import { Request, Response } from "express";
import { productRepository } from "../repositories/productRepository";
import { DepartmentRepository } from "../repositories/departmentRepository";
import { In } from "typeorm";

export class ProductController {
    
    async create(req: Request, res: Response) {
        const { name, description, barcode, price, departmentIds } = req.body;

        if (!name || !departmentIds || departmentIds.length === 0) {
            return res.status(400).json({ message: 'Name and at least one departmentId are required' });
        }

        try {

            const departments = await DepartmentRepository.findByIds(departmentIds);
            if (departments.length !== departmentIds.length) {
                return res.status(404).json({ message: 'One or more departments not found' });
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
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getAll(req: Request, res: Response){
        
        try{

            const products = await productRepository.find()

            return res.status(200).json(products);

        } catch(error){
            console.log(error)
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    async getProduct(req: Request, res: Response){
        const { id } = req.params;

        try{

            const productId = parseInt(id);

            const product = await productRepository.findOneBy({id: productId});
            
            if(!product){
                return res.status(404).json('Product not found')
            }

            return res.status(200).json(product)

        }catch(error){
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }

    }


    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, barcode, price, departmentIds } = req.body;

        try {
            const productId = parseInt(id);
            const departmentIdsInt = departmentIds.map((i: { id: string; }) => parseInt(i.id));

            const product = await productRepository.findOne({
                where: { id: productId },
                relations: ["departments"]
            });


            if(!product){
                return res.status(404).json({message:"Product not found"});
            }

            // verifica se os deparments existem.

            const departments = await DepartmentRepository.findBy({
                id: In (departmentIdsInt)
            })

            
            if(!departments || (Object.values(departments)).length != departmentIdsInt.length){
                return res.status(404).json({message:'One or more departments not found'});
            }

            if (name) product.name = name;
            if (description) product.description = description;
            if (barcode) product.barcode = barcode;
            if (price) product.price = price;
            product.departments = departments;

            await productRepository.save(product);

            return res.status(200).json(product);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }


    async getProductsByDepartment(req: Request, res: Response) {
        const { departmentName } = req.params;

        try {

            const department = await DepartmentRepository.findOne({ relations: ['products'], where: { department_name: departmentName } });
            if (!department) {
                return res.status(404).json({ message: 'Department not found' });
            }

            return res.json(department.products);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteProduct(req: Request, res: Response){

        const { id } = req.params
        

        try{

            const productId = parseInt(id)
            const product = await productRepository.findOneBy({id: productId});

            if (!product){
                return res.status(404).json('Product not nound');
            }

            await productRepository.delete(id)

            return res.status(200).json({message:'Product deleted'});

        }catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }


    }

}