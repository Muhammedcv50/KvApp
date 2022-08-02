import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRespository{


    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }



    async getAllDepartments(){
         const departmentRepo = getConnection().getRepository(Department);
        // const data=await departmentRepo.find();
        //console.log(data);

        return departmentRepo.find();
    }
    }
