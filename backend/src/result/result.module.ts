import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultController } from './result.controller';
import { Result } from './result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result])],
  controllers: [ResultController],
  providers: [ResultService],
  exports: [ResultService],
})
export class ResultModule {}
