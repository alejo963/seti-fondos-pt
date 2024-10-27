import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/user.dto';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { SubscribeUserDto } from './subscriptions/dtos/subscription.dto';
import { Types } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: Types.ObjectId) {
    return await this.usersService.getUser(id);
  }

  @Post()
  async createUser(@Body() payload: CreateUserDto) {
    return await this.usersService.createUser(payload);
  }

  @Post(':id/subscriptions')
  async subscribeToFund(
    @Param('id') id: Types.ObjectId,
    @Body() payload: SubscribeUserDto,
  ) {
    return await this.subscriptionsService.subscribeToFund(id, payload);
  }

  @Get(':id/subscriptions')
  async getUserSubscriptions(@Param('id') id: Types.ObjectId) {
    return await this.subscriptionsService.getUserSubscriptions(id);
  }

  @Delete(':id/subscriptions/:subId')
  async unsubscribeFromFund(
    @Param('id') id: Types.ObjectId,
    @Param('subId') subId: Types.ObjectId,
  ) {
    return await this.subscriptionsService.unsubscribeFromFund(id, subId);
  }
}
