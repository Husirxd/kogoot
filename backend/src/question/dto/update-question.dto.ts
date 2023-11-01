import { UpdateAnswerDto } from '../../answer/dto/update-answer.dto';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateQuestionDto {

    @ApiProperty()
    id?: number;

    @ApiProperty()
    question: string;

    @ApiProperty()
    answers: UpdateAnswerDto[];
  }
  