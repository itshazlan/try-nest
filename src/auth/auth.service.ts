import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService){ }

    async validateUserByPassword(loginAttempt: LoginUserDto, res) {
        let userToAttempt: any = await this.usersService.findOneByEmail(loginAttempt.email);
        if (!userToAttempt) {
            return res.status(HttpStatus.UNAUTHORIZED).json({msg: 'User not found'});
        }

        return new Promise((resolve) => {
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
                if(err) throw new UnauthorizedException();
    
                if(isMatch){
                    resolve(this.createJwtPayload(userToAttempt));
                } else {
                    return res.status(HttpStatus.UNAUTHORIZED).json({msg: 'Wrong password'});
                }
            });
        });
    }

    createJwtPayload(user){
        let data: JwtPayload = {
            id: user._id,
            email: user.email
        };

        let jwt = this.jwtService.sign(data);

        return {
            exp: 36000,
            token: jwt            
        }
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.getUser(payload.id);
    }
}