import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Post, Body, Param, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';
@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService) {}

    @ApiResponse({ status: 200, description: 'Returns new user object'})
    @Post("create")
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.usersService.createUser(body.email, body.password, body.nickname, body.uid);
        return user;
    }
    
    @ApiResponse({ status: 200, description: 'Returns user object'})
    @Get(":id")
    async getUser(@Param('id') id: number) {
        const user = await this.usersService.getUser(id);
        return user;
    }

}
