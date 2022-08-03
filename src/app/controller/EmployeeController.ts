import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddelware";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import { CreateUuidDto } from "../dto/CreateUuid";
import authorize from "../middleware/authorize";

class EmployeeController extends AbstractController {
  

  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }


  protected initializeRoutes() {

    this.router.get(`${this.path}`, 
    authorize(['admin','superAdmin']),
    this.getAllEmployee);

    this.router.get(`${this.path}/:id`, authorize(['admin','superAdmin']),this.getEmployeeById);

    this.router.delete(`${this.path}/:id`,authorize(['admin','superAdmin']), this.deleteEmployeeById);

    this.router.post(
      `${this.path}/login`,
      this.login
    );

    this.router.post(
        `${this.path}`,
        authorize(['admin','superAdmin']),
        validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
        this.createEmployee
      );

    this.router.put(
        `${this.path}/:id`,
        authorize(['admin','superAdmin']),
         validationMiddleware(CreateUuidDto, APP_CONSTANTS.params),
         validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
        this.updateEmployee
      );

  }


  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction ) => {

    try {
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
     // console.log(request.body);
    } catch (err) {
      next(err);
    }
  }


  private updateEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.updateEmployee(request.params.id,request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
      console.log(request.body);
    } catch (err) {
      next(err);
    }
  }

  
  private getAllEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployee();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }


  private getEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getEmployeeById(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }


  private deleteEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.softdeleteEmployeeById(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }


  private login = async (
    request: RequestWithUser,
    response: Response,
    
    next: NextFunction
  ) => {
    try{
      
    const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.username,
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );}
    catch(error){
      next(error);
    }
  };

}

export default EmployeeController;
