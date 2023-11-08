import { Controller, Res, StreamableFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { Post, Body, Param, Get, ParseFilePipeBuilder, UploadedFile  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { create } from 'domain';
import { Stream } from 'stream';
@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService) {}

  
    @ApiResponse({ status: 200, description: 'Returns new user object'})
    @Post("create")
    @UseInterceptors(FileInterceptor('file'))
    async createUser(@Body() body: CreateUserDto,  @UploadedFile() file: Express.Multer.File){
        //get file from body   
       
        //create file name
        
        
        const filename = `${uuidv4()}${path.extname(file.originalname)}`;
        //create file path
   
        const filePath = path.join(__dirname, '..','..', 'uploads', filename);
        //if path dont exist create it
        if (!fs.existsSync(path.join(__dirname, '..', '..', 'uploads'))) {
          fs.mkdirSync(path.join(__dirname, '..','..', 'uploads'));
        }
        try {
          // Save the file to the specified path

          fs.writeFileSync(filePath, file.buffer);

        } catch (error) {
            console.log(error);
        }
        console.log(filePath);

        let uid = uuidv4();
        const user = await this.usersService.createUser(body.email, body.password, body.nickname, uid, filePath);
        return user;
    }
    
    @ApiResponse({ status: 200, description: 'Returns user object'})
    @Get(":id")
    async getUser(@Param('id') id: number) {
        const user = await this.usersService.getUser(id);
        return user;
    }


}
