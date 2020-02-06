import { IsEmail, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
    @ApiProperty({ example: 'John', description: 'Set first name' })
    @IsString()
    readonly first_name: string;

    @ApiProperty({ example: 'Doe', description: 'Set last name' })
    @IsString()
    readonly last_name: string;

    @ApiProperty({ example: 'john@doe.com', description: 'Set email' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: '0888', description: 'Just a phone number' })
    @IsInt()
    readonly phone: string;

    @ApiProperty({ example: 'Roundlake street, 10', description: 'Just an address' })
    @IsString()
    readonly address: string;

    @ApiProperty({ example: 'Hello world', description: 'Simple description' })
    @IsString()
    readonly description: string;
}