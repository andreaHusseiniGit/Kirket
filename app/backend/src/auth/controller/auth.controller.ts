import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    // /auth/login
    @Post('login')
    login(@Body() body: { email: string, password: string }) {
      return this.authService.login(body.email, body.password);
    }

    // /auth/register
    @Post('register')
    register(@Body() body: { email: string, name: string, password: string }) {
      return this.authService.register(body.email, body.name, body.password);
    }
}
