import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { QuestionModule } from '../question/question.module';
@Module({
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
  imports: [
    QuestionModule,
  ],


})
export class ImageModule {}
