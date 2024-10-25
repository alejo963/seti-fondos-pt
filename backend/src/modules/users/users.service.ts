import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getUser(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async createUser(payload: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(payload);
        return createdUser.save();
    }
}
