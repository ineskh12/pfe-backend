import { Controller, Post, Body, Res, HttpStatus ,Logger} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto'

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login') 
    async login(@Body() loginUserDto: LoginUserDto, @Res() res){
        Logger.log('Authentification controller','AuthController')
        const result = await this.authService.validateUserByPassword(loginUserDto);
        if (result.success) {
             var ines=res.json(result.data)
             
             
            return ines;
         
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({msg: result.msg});
        }
    }
}