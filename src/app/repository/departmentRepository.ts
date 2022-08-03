import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRespository{


    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }


    async softdeleteDepartmentById(departmentId : any){
        const departmentRepo = getConnection().getRepository(Department);
        const data=await departmentRepo.softDelete( {id: departmentId});
       return data
    }

    public async updateDepartmentDetails(departmentId: string, departmentDetails: any) {
        const departmentRepo = getConnection().getRepository(Department);
        //console.log(departmentId);
        const updateDepartmentDetails = await departmentRepo.update(departmentId,departmentDetails );
        return updateDepartmentDetails;
    }

    async getAllDepartments(){
         const departmentRepo = getConnection().getRepository(Department);
        // const data=await departmentRepo.find();
        //console.log(data);

        return departmentRepo.find();
    }
    }
