import { Type } from "class-transformer";
import { IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./CreateAddress";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public username: string;

    @IsString()
    public  role :string;

    @IsString()
    public status: string;

    @IsString()
    public joiningDate: string;


    @IsString()
    public password: string;

    @IsNumber()
     public experience: number;

    @IsUUID()
    public departmentId: string;

    @ValidateNested({each:true})
    @Type(()=>CreateAddressDto)
    public address:CreateAddressDto
}