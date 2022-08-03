import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import validationMiddleware from "../middleware/validationMiddelware";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import authorize from "../middleware/authorize";


class DepartmentController extends AbstractController {

  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`, 
    //authorize(['admin','superAdmin']),    // view rights given
    this.getDepartment);
    
    this.router.post(
        `${this.path}`,
        authorize(['admin','superAdmin']),
        validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
        this.createDepartment
      );


    this.router.delete(`${this.path}/:id`, authorize(['admin','superAdmin']),this.deleteDepartmentById);

    this.router.put(
      `${this.path}/:id`,
      authorize(['admin','superAdmin']),
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
      this.updateDepartment
    );

  }

  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.departmentService.createDepartment(request.body);
      //console.log(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  
  private getDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.departmentService.getDepartment();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }


  private updateDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.departmentService.updateDepartment(request.params.id,request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
      console.log(request.body);
    } catch (err) {
      next(err);
    }
  }


  private deleteDepartmentById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.departmentService.softdeleteDepartmentById(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  
}

export default DepartmentController;
