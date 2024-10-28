import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { SubscribeUserDto } from './subscriptions/dtos/subscription.dto';
import { Types } from 'mongoose';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { Subscription } from './subscriptions/schemas/subscription.schema';

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

  @Put(':id')
  async updateUser(
    @Param('id') id: Types.ObjectId,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, payload);
  }

  @Post(':id/subscriptions')
  @ApiBadRequestResponse({
    description:
      'Subscription already exists, not enough money on wallet or amount is less than minSubscriptionAmount',
  })
  @ApiCreatedResponse({
    type: Subscription,})
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
