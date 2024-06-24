import { Router } from "express";
import { ProductController } from "./controllers/ProductsController";
import { DepartmentController } from "./controllers/DepartmentsController";

const routes = Router()

routes.get('/products/:departmentName', new ProductController().getProductsByDepartment)
routes.post('/products', new ProductController().create)
routes.get('/products', new ProductController().getAll)

routes.post('/departments', new DepartmentController().create)
routes.get('/departments', new DepartmentController().getAll)

export default routes 