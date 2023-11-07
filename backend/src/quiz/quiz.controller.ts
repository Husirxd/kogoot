// quiz.controller.ts
import { Controller, Post, Body, Get, Param, Query, Put, Delete, Res,  StreamableFile } from '@nestjs/common';
import { QuizService } from './quiz.services';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ValidateQuizDto } from './dto/validate-quiz.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {
    
  }
  
  // @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createQuiz(@Body() createQuizDto: CreateQuizDto, @UploadedFiles() files: Array<Express.Multer.File>) {


    let images = [];

    files.map(file => {
      let questionId = file.fieldname.split('-')[1];
      const filename = `${uuidv4()}${path.extname(file.originalname)}`;
      const filePath = path.join(__dirname, '..','..', 'uploads', filename);
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'uploads'))) {
        fs.mkdirSync(path.join(__dirname, '..','..', 'uploads'));
      }
      try {
        fs.writeFileSync(filePath, file.buffer);
        images[questionId] = filePath;
        
      } catch (error) {
          console.log(error);
      }
    });

    const quiz = await this.quizService.createQuiz(createQuizDto, images);
    return quiz;
  }

  @Put()
  async updateQuiz(@Body() updateQuizDto: UpdateQuizDto) {
    const quiz = await this.quizService.updateQuiz(updateQuizDto);
    return quiz;
  }

  @Delete(':uid')
  async deleteQuiz(@Param('uid') uid: string) {
    const quiz = await this.quizService.deleteQuiz(uid);
    return quiz;
  }

  @Get('single/:quizId')
  async getQuiz(@Param('quizId') quizId: number) {
    const quiz = await this.quizService.getQuiz(quizId);
    return quiz;
  }

  @Get('uid/:uid')
  async getQuizByUid(@Param('uid') uid: string) {
    const quiz = await this.quizService.getQuizByUid(uid);
    return quiz;
  }



  @Get("user/:userId")
  async getQuizzesByUser(@Param('userId') userId: number) {
    const quizzes = await this.quizService.getQuizzesByUser(userId);
    return quizzes;
  }

  @Get("category/:categoryId")
  async getQuizzesByCategory(@Param('categoryId') categoryId: number) {
    const quizzes = await this.quizService.getQuizzesByCategory(categoryId);
    return quizzes;
  }

  @Get()
  async getQuizzes(@Query('limit') limit: number, @Query('offset') offset: number) {
    const quizzes = await this.quizService.getQuizzes(limit, offset);
    return quizzes;
  }

  @Get('search')
  async searchQuizzes(@Query('search') search: string) {
    const quizzes = await this.quizService.searchQuizzes(search);
    return quizzes;
  }

  @Post('validate')
  async validateQuiz(@Body() body: ValidateQuizDto) {

    const quiz = await this.quizService.validateQuiz(body);
    return quiz;
  }


  //TODO: Przeniesc 
  @Get("question/image/:id")
  async getAvatar(@Param('id') id: number,  @Res({passthrough:true}) res: any) { 

      const question = await this.quizService.getQuestion(id);

      res.set('Content-Type', 'image/png');
      const file = fs.createReadStream(path.join(question.image));
      return new StreamableFile(file);
  }

}