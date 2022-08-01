import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{


    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }



    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        // const data=await employeeRepo.find();
        //console.log(data);

        return employeeRepo.find();
    }
    }
