// create-quiz.dto.ts
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateQuestionDto } from '../../question/dto/create-question.dto';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import {ApiProperty} from "@nestjs/swagger"

export class CreateQuizDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;

  @ApiProperty()
  status: string;

  @ApiProperty({type:[CreateQuestionDto]})
  questions: CreateQuestionDto[];

  @ApiProperty()
  userId: number;
  
  @ApiProperty({type:[Number]})
  categoriesIds: number[];
}


