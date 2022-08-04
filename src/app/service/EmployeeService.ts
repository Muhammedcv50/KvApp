import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import { Address } from "../entities/Address";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import e from "express";


export class EmployeeService{

    constructor(private employeeRepo : EmployeeRespository){

    }


    public async createEmployee(employeeDetails: CreateEmployeeDto) {
        try {

          const newAddress = plainToClass(Address, {
            addressLine1: employeeDetails.address.addressLine1,
            addressLine2: employeeDetails.address.addressLine2,
            city:employeeDetails.address.city,
            state:employeeDetails.address.state,
            country:employeeDetails.address.country,
            zip:employeeDetails.address.zip
            // isActive: true,
        });

        //console.log(newAddress);
            const newEmployee = plainToClass(Employee, {
                 name: employeeDetails.name,
                 password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password,10):'',
                 experience: employeeDetails.experience,
                 departmentId: employeeDetails.departmentId,
                 username:employeeDetails.username,
                 role:employeeDetails.role,
                 address:newAddress,
                 status:employeeDetails.status,
                 joiningDate:employeeDetails.joiningDate

                // isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            
            return save;
        } catch (err) {
            throw new HttpException(400,"failed to create employee");
             
        }
    }

    public async updateEmployee(employeeId:string,employeeDetails: CreateEmployeeDto) {
        try {

          const employee= await this.employeeRepo.getEmployeeById(employeeId);

          const newAddress = plainToClass(Address, {
            id:(employee).addressId,
            addressLine1: employeeDetails.address.addressLine1,
            addressLine2: employeeDetails.address.addressLine2,
            city:employeeDetails.address.city,
            state:employeeDetails.address.state,
            country:employeeDetails.address.country,
            zip:employeeDetails.address.zip
            
        });

        const newEmployee = plainToClass(Employee, {
          id:employeeId,
          name: employeeDetails.name,
          password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password,10):'',
          experience: employeeDetails.experience,
          departmentId: employeeDetails.departmentId,
          username:employeeDetails.username,
          role:employeeDetails.role,
          address:newAddress,
          status:employeeDetails.status,
          joiningDate:employeeDetails.joiningDate

        
     });
            const save = await this.employeeRepo.updateEmployeeDetails(employeeId,newEmployee);
            return save;
        } catch (err) {
          throw new HttpException(400,"failed to update the employee");

        }
    }


    async getAllEmployee(){

        return await this.employeeRepo.getAllEmployees();
    }


    async softdeleteEmployeeById(employeeId : string){

        return await this.employeeRepo.softdeleteEmployeeById(employeeId);
    }


    async getEmployeeById(employeeId : string){
        const employee = await this.employeeRepo.getEmployeeById(employeeId);
        if(!employee)
        {
            throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
        }

        return employee;
    }


    public employeeLogin = async (
        username: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByUsername(
          username
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "role":employeeDetails.role
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORRECT_CREDENTIAL);
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  


    
    }