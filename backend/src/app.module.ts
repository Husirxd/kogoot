import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AnswerModule } from './answer/answer.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    QuizModule, QuestionModule, UserModule, CategoryModule, AnswerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
