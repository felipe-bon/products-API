import { AppDatasource } from "../data-source";
import { Product } from "../entities/Product";


export const productRepository = AppDatasource.getRepository(Product)