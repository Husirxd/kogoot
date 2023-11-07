import { Controller } from '@nestjs/common';
import { Get, Param, Res } from '@nestjs/common';
import { StreamableFile } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { QuestionService } from '../question/question.service';
@Controller('image')
export class ImageController {

    constructor(private readonly questionService: QuestionService) {
        
    }

    
  @Get("question/:id")
  async getAvatar(@Param('id') id: number,  @Res({passthrough:true}) res: any) { 
      const question = await this.questionService.getQuestion(id);
      res.set('Content-Type', 'image/png');
      const file = fs.createReadStream(path.join(question.image));
      return new StreamableFile(file);
  }

}


