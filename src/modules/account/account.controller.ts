import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest } from 'src/core/dto/login.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('login')
  async login(@Body() login: LoginRequest) {
    return await this.accountService.login(login);
  }

  @Post('create')
  async create(@Body() data: LoginRequest) {
    return await this.accountService.create(data);
  }
}
