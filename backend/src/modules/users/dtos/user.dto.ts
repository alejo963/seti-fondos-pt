import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { NotificationMethod } from '../schemas/user.schema';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsNumberString()
  readonly nationalId: string;
  @IsEmail()
  readonly email: string;
  @IsPhoneNumber('CO')
  readonly phoneNumber: string;
  @IsNumber()
  @IsPositive()
  readonly wallet: number;
  @IsString()
  @IsEnum(NotificationMethod)
  readonly notificationMethod: NotificationMethod;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
