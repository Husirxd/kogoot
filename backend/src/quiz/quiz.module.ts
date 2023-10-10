// src/quiz/quiz.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.services';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  controllers: [QuizController], // You'll define the controller in the next step
  providers: [QuizService], // You'll define the service in the next step
})
export class QuizModule {}
