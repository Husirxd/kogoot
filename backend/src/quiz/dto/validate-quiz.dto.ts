import { ApiProperty } from "@nestjs/swagger";




class ValidateQuestionDto {
  @ApiProperty()
  questionId: number; // ID of the question
  
  @ApiProperty()
  chosenAnswerId: number; // ID of the chosen answer
}

export class ValidateQuizDto {
    @ApiProperty()
    quizId: number; // ID of the quiz
    
    @ApiProperty()
    participantId?: number; // Name of the participant
    
    @ApiProperty({ type: [ValidateQuestionDto] })
    questions: {
      questionId: number; // ID of the question
      chosenAnswerId: number; // ID of the chosen answer
    }[];
  }
