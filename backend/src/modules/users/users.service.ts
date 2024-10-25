import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUser(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
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

    const createdUser = new this.userModel(payload);
    return createdUser.save();
  }

  async updateUser(id: string, payload: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, payload, { new: true });
  }
}
