import { EmployeeRespository } from "../repository/employeeRepository";

export class EmployeeService{

    constructor(private employeeRepo : EmployeeRespository){

    }


    async getEmployee(){

        return await this.employeeRepo.getAllEmployees();
    }
    }