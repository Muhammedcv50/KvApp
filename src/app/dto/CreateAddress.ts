import { IsNumber, IsString } from "class-validator";

export class CreateAddressDto {
   

    @IsString()
      public addressLine1: string;

      @IsString()
      public addressLine2: string;

      @IsString()
      public city: string;

      @IsString()
      public state: string;

      @IsString()
      public country : string;

      @IsString()
      public zip:string;
}