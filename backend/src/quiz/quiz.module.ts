// quiz.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.services';
import { Quiz } from './quiz.entity';
import { Question } from 'src/question/question.entity';
import { Answer } from 'src/answer/answer.entity';
import { User } from 'src/users/users.entity';
import { Category } from 'src/category/category.entity';
import { FileModule } from 'src/file/file.module';
@Module({
  imports: [
  TypeOrmModule.forFeature([Quiz]),
  TypeOrmModule.forFeature([Question]),
  TypeOrmModule.forFeature([Answer]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Category]),
  FileModule
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}