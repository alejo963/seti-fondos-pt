import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'

export class SubscribeDto {

    @IsString()
    @IsNotEmpty()
    readonly fundId: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly amount: number;
}

