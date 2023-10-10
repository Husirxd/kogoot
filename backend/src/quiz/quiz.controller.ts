// src/quiz/quiz.controller.ts

import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizService } from './quiz.services';
@Controller('quizzes')
export class QuizController {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly quizService: QuizService,
  ) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto) {
    const quiz = this.quizRepository.create(createQuizDto);
    await this.quizRepository.save(quiz);
    return quiz;
  }

  @Get()
  async findNQuizzes(@Query('count') count: number): Promise<Quiz[]> {
    return this.quizService.findNQuizzes(count);
  }

}