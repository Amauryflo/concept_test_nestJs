import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() body: { username: string; pass: string }) {
    return this.authService.signIn(body);
  }
}
