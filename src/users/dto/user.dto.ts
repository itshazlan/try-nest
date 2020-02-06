import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    readonly first_name: string;

    @ApiProperty()
    readonly last_name: string;

    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly email: string;
}