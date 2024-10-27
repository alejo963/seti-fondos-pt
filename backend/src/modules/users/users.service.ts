import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUser(id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async createUser(payload: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ nationalId: payload.nationalId })
      .exec();

    if (existingUser) {
      throw new HttpException(
        `User with nationalId ${payload.nationalId} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser: User = await this.userModel.create(payload);
    return createdUser;
  }

  async updateUser(id: Types.ObjectId, payload: UpdateUserDto): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
  }
}
