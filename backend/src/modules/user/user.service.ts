import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    getUsers() {
        //TODO: Get users from mongoDB
        console.log("GET USERS FUNCTION")
    }

    getUser(id: string) {
        console.log(id)
    }

    createUser(payload) {
        console.log("USER CREATED")
    }
}
