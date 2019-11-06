import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto'

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post() 
    async login(@Body() loginUserDto: LoginUserDto, @Res() res){
        let jwt = await this.authService.validateUserByPassword(loginUserDto, res);
        return res.json(jwt);
    }

}