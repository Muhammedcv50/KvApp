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


    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        console.log(employeeId);
        const updateEmployeeDetails = await employeeRepo.save(employeeDetails );
        return updateEmployeeDetails;
    }

    async getEmployeeById(id:string, relations:string[]=['department','address']){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id,{ relations:relations});
    }

    
//     async getEmployeeById(employeeId : any){
//         const employeeRepo = getConnection().getRepository(Employee);
//         const data=await employeeRepo.findOne( {id: employeeId});
//        return data
//    }

   async softdeleteEmployeeById(employeeId : any){
    const employeeRepo = getConnection().getRepository(Employee);
    const employeeDetails= await this.getEmployeeById(employeeId);
    const data=await employeeRepo.softRemove( employeeDetails);
   return data
}

public async getEmployeeByUsername(username: string) {
    const employeeRepo = getConnection().getRepository(Employee);
    const employeeDetail = await employeeRepo.findOne({
        where: { username },
    });
    return employeeDetail;
}








    }

