// create-quiz.dto.ts
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateQuestionDto } from '../../question/dto/create-question.dto';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
export class CreateQuizDto {
  title: string;
  description: string;
  status: string;
  questions: CreateQuestionDto[];
  userId: number;
  categoriesIds: number[];
}


