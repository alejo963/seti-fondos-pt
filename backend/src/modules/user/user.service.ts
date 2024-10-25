import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    getUsers() {
        //TODO: Get users from mongoDB
        console.log("GET USERS FUNCTION")
    }

    getUser(id: string) {
        console.log(id)
    }

    async createUser(payload: CreateUserDto) {
        const createdUser = new this.userModel(payload);
        return createdUser.save();
    }
}
