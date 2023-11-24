import { Controller } from '@nestjs/common';
import { Get, Param, Res } from '@nestjs/common';
import { StreamableFile } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { QuestionService } from '../question/question.service';
import { UsersService } from 'src/users/users.service';
import { QuizService } from 'src/quiz/quiz.services';
@Controller('image')
export class ImageController {

    constructor(
      private readonly questionService: QuestionService,
      private readonly usersService: UsersService,
      private readonly quizService: QuizService
      ) {
        
    }

    
  @Get("question/:id")
  async getAvatar(@Param('id') id: number | null,  @Res({passthrough:true}) res: any) { 
      if(id === 0 || id === null) return;
      const question = await this.questionService.getQuestion(id);
      res.set('Content-Type', 'image/png');
      if(!question.image) return;
      const file = fs.createReadStream(path.join(question.image));
      return new StreamableFile(file);
  }

  @Get("user/:id")
  async getUserAvatar(@Param('id') id: number | null | undefined,  @Res({passthrough:true}) res: any) { 
   
    if(id === 0 || id === null) return;
      const user = await this.usersService.getUser(id);
      console.log(user);
      res.set('Content-Type', 'image/png');
      if(!user.avatar) return;

      const file = fs.createReadStream(path.join(user.avatar));
      return new StreamableFile(file);
  }
  
  @Get("quiz/:id")
  async getQuizAvatar(@Param('id') id: number | null,  @Res({passthrough:true}) res: any) {   
    if(id === 0 || id === null) return;
      const quiz = await this.quizService.getQuiz(id);
      res.set('Content-Type', 'image/png');
      if(!quiz.image) return "";
      const file = fs.createReadStream(path.join(quiz.image));
      return new StreamableFile(file);
  }

}


