import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { QuestionModule } from '../question/question.module';
import { UsersModule } from 'src/users/users.module';
import { QuizModule } from 'src/quiz/quiz.module';
@Module({
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
  imports: [
    QuestionModule,
    UsersModule,
    QuizModule
  ],


})
export class ImageModule {}
