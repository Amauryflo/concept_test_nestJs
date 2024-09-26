import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UserService } from '../../service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('createUser')
  async signIn(@Body() body: { username: string; email: string }) {
    return this.authService.createUser(body.username, body.email);
  }
  @Get('getAll')
  async getAll() {
    return this.authService.getAllUsers();
  }
  @Patch('updateUser')
  async updateUser(
    @Body() body: { id: string; username: string; email: string },
  ) {
    return this.authService.updateUser(body.id, body.username, body.email);
  }
}
