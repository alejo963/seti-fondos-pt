import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/user.dto';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { SubscribeUserDto } from './subscriptions/dtos/subscription.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }

  @Post()
  async createUser(@Body() payload: CreateUserDto) {
    return await this.usersService.createUser(payload);
  }

  @Post(':id/subscriptions')
  async subscribeToFund(
    @Param('id') id: string,
    @Body() payload: SubscribeUserDto,
  ) {
    return await this.subscriptionsService.subscribeToFund(id, payload);
  }

  @Get(':id/subscriptions')
  async getUserSubscriptions(@Param('id') id: string) {
    return await this.subscriptionsService.getUserSubscriptions(id);
  }

  @Put(':id/subscriptions/:fundId')
  async unsubscribeFromFund(
    @Param('id') id: string,
    @Param('fundId') fundId: string,
  ) {
    return await this.subscriptionsService.unsubscribeFromFund(id, fundId);
  }
}
