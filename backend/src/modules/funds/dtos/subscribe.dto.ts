import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'

export class SubscribeDto {

    @IsString()
    @IsNotEmpty()
    readonly fundsId: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly amount: number;
}

