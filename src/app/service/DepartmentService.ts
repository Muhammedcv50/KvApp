import { plainToClass } from "class-transformer";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/DepartmentRepository";

export class DepartmentService{

    constructor(private departmentRepo : DepartmentRespository){

    }


    async softdeleteDepartmentById(employeeId : string){

        return await this.departmentRepo.softdeleteDepartmentById(employeeId);
    }



    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                numberOfEmployees: departmentDetails.numberOfEmployees
          
          
            });
            

            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create department");
        }
    }


    public async updateDepartment(departmentId:string,departmentDetails: CreateDepartmentDto) {
        try {

          
          
          
        const newDepartment = plainToClass(Department, {
            name:departmentDetails.name,
            numberOfEmployees:departmentDetails.numberOfEmployees
          

         // isActive: true,
     });
            const save = await this.departmentRepo.updateDepartmentDetails(departmentId,newDepartment);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create department");
        }
    }
    

    async getDepartment(){

        return await this.departmentRepo.getAllDepartments();
    }
    }