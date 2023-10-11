import { CreateAnswerDto } from '../../answer/dto/create-answer.dto';
export class CreateQuestionDto {
    question: string;
    answers: CreateAnswerDto[];
  }
  