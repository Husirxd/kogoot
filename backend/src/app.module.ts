import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { AnswerModule } from './answer/answer.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ImageModule } from './image/image.module';
import { FileModule } from './file/file.module';
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
    QuizModule, QuestionModule, UsersModule, CategoryModule, AnswerModule, AuthModule, ImageModule, FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
