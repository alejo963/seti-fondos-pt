import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNumber, IsNumberString, IsPositive, IsString, } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly firstName: string;
    @IsString()
    readonly lastName: string;
    @IsNumberString()
    readonly nationalId: string;
    @IsEmail()
    readonly email: string;
    @IsNumber()
    @IsPositive()
    readonly wallet: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}