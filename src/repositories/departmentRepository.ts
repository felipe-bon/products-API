import { AppDatasource } from "../data-source";
import { Department } from "../entities/Department";

export const DepartmentRepository = AppDatasource.getRepository(Department)