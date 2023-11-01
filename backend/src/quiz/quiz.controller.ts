// quiz.controller.ts
import { Controller, Post, Body, Get, Param, Query, Put } from '@nestjs/common';
import { QuizService } from './quiz.services';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ValidateQuizDto } from './dto/validate-quiz.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateQuizDto } from './dto/update-quiz.dto';
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {
    
  }
  
  // @UseGuards(AuthGuard)
  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    const quiz = await this.quizService.createQuiz(createQuizDto);
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

  @Put()
  async updateQuiz(@Body() updateQuizDto: UpdateQuizDto) {
    const quiz = await this.quizService.updateQuiz(updateQuizDto);
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
}