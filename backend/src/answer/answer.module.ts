import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
//import { AnswerController } from './Answer.controller';
//import { AnswerService } from './Answer.services';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  //controllers: [AnswerController], // You'll define the controller in the next step
  //providers: [AnswerService], // You'll define the service in the next step
})
export class AnswerModule {}
