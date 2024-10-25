import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/')
    getUsers() {
        return this.userService.getUsers()
    }

    @Get('/:id')
    getUser(@Param('id') id: string) {
        return this.userService.getUser(id)
    }

    @Post('/')
    createUser(@Body() payload: CreateUserDto) {
        return this.userService.createUser(payload)
    }
}
