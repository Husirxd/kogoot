export class ValidateQuizDto {
    quizId: number; // ID of the quiz
    participantId?: number; // Name of the participant
    questions: {
      questionId: number; // ID of the question
      chosenAnswerId: number; // ID of the chosen answer
    }[];
  }