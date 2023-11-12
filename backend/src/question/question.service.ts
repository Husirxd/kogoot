import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
    
    ){}

    
    async getQuestion(questionId: number): Promise<any> {
    const question = await this.questionRepository.findOne({where: {id: questionId}});
    return question;
    }
}
