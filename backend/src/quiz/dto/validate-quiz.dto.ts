import {ApiProperty} from "@nestjs/swagger"
export class ValidateQuizDto {
    @ApiProperty()
    quizId: number; // ID of the quiz
    @ApiProperty()
    participantId?: number; // Name of the participant
    
    @ApiProperty({type:[Object]})
    questions: {
      questionId: number; // ID of the question
      chosenAnswerId: number; // ID of the chosen answer
    }[];
  }
