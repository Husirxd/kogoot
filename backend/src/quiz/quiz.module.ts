// quiz.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.services';
import { Quiz } from './quiz.entity';
import { Question } from 'src/question/question.entity';
import { Answer } from 'src/answer/answer.entity';
@Module({
  imports: [
  TypeOrmModule.forFeature([Quiz]),
  TypeOrmModule.forFeature([Question]),
  TypeOrmModule.forFeature([Answer])
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}