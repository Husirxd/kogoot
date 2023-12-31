// create-quiz.dto.ts
import { CreateQuestionDto } from '../../question/dto/create-question.dto';
import { ApiProperty } from '@nestjs/swagger';

  export class CreateQuizDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: string;

    @ApiProperty({ type: [CreateQuestionDto] })
    questions: CreateQuestionDto[];

    @ApiProperty()
    userId: number;

    @ApiProperty({ type: [Number] })
    categoriesIds: number[];
  
    @ApiProperty()
    uid: string;
}

