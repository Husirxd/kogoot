import { CreateAnswerDto } from '../../answer/dto/create-answer.dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateQuestionDto {
    @ApiProperty()
    question: string;

    @ApiProperty()
    answers: CreateAnswerDto[];
  }
  