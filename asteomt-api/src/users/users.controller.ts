import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('seed-admin')
  async seedAdmin(
    @Body()
    body: { email: string; password: string; name: string },
  ) {
    // Apenas para ambiente inicial / desenvolvimento.
    return this.usersService.createUser(body);
  }
}
