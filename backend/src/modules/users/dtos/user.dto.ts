import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
} from 'class-validator';
import { NotificationMethod } from '../schemas/user.schema';
import { PartialType } from '@nestjs/mapped-types';

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
  @IsString()
  @IsEnum(NotificationMethod)
  readonly notificationMethod: NotificationMethod;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
