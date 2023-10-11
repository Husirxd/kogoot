// create-quiz.dto.ts
import { CreateQuestionDto } from '../../question/dto/create-question.dto';
export class CreateQuizDto {
  title: string;
  description: string;
  status: string;
  questions: CreateQuestionDto[];
}


