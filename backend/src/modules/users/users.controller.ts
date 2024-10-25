import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }

  @Post('/')
  async createUser(@Body() payload: CreateUserDto) {
    return await this.usersService.createUser(payload);
  }

  @Put('/:id/subscriptions')
  async subscribeToFund(@Body() payload: UpdateUserDto) {
    return await this.usersService.subscribeToFund(payload);
  }

  @Get('/:id/subscriptions')
  async getUserSubscriptions() {}

  @Put('/:id/subscriptions/:fundId')
  async unsubscribeFromFund() {}
}
