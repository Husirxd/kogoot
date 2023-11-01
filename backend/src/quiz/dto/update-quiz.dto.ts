// create-quiz.dto.ts
import { UpdateQuestionDto } from '../../question/dto/update-question.dto';
import { ApiProperty } from '@nestjs/swagger';

  export class UpdateQuizDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: string;

    @ApiProperty({ type: [UpdateQuizDto] })
    questions: UpdateQuestionDto[];

    @ApiProperty()
    userId: number;

    @ApiProperty({ type: [Number] })
    categoriesIds: number[];
  

}

