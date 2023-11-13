import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultController } from './result.controller';
import { Result } from './result.entity';
import { User } from '../users/users.entity';
import { UsersModule } from 'src/users/users.module';
import { Quiz } from 'src/quiz/quiz.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Result]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Quiz]),
  UsersModule,
  ],
  controllers: [ResultController],
  providers: [ResultService],
  exports: [ResultService],
})
export class ResultModule {}
