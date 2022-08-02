import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/departmentRepository";

export class DepartmentService{

    constructor(private departmentRepo : DepartmentRespository){

    }





    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                id: departmentDetails.name,

                 dept_name: departmentDetails.dept_name
          
            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create department");
        }
    }

    async getDepartment(){

        return await this.departmentRepo.getAllDepartments();
    }
    }