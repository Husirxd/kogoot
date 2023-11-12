import { ApiProperty } from "@nestjs/swagger";


class ValidateQuestionDto {
  @ApiProperty()
  questionId: number;
  
  @ApiProperty()
  chosenAnswerId: number;
}

export class ValidateQuizDto {
    @ApiProperty()
    quizId: number; 
    
    @ApiProperty()
    participantId?: number;
    
    @ApiProperty({ type: [ValidateQuestionDto] })
    questions: {
      questionId: number;
      chosenAnswerId: number;
    }[];
  }
