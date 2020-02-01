import { IsEmail } from 'class-validator';

export class CreateCustomerDto {
    readonly first_name: string;
    readonly last_name: string;
    @IsEmail()
    readonly email: string;
    readonly phone: string;
    readonly address: string;
    readonly description: string;
    readonly created_at: Date;
}