import { Body, Controller, Get , Post} from '@nestjs/common';
import { SignInData } from 'src/models/signInData';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Get('test')
    getHello(): string {
        return this.authService.getHello();
    }

    @Post('login')
    loginUser(@Body() signInData : SignInData):string{


        return '';
    }

}


