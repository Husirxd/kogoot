import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './result.entity';
import { ValidateQuizDto } from 'src/quiz/dto/validate-quiz.dto';
import { v4 as uuidv4 } from 'uuid';
import { Quiz } from 'src/quiz/quiz.entity';
@Injectable()
export class ResultService {

    constructor(
        @InjectRepository(Result)
        private readonly resultRepository: Repository<Result>,
    ){}

    async createResult(result: ValidateQuizDto, quiz: Quiz, score: number): Promise<any> {

        const uid = uuidv4();
        const newResult = new Result();
        const answers = JSON.stringify(result.questions);
        const participantId = result.participantId ? result.participantId : null;
        newResult.uid = uid;
        newResult.quiz = quiz;
        newResult.score = score;
        newResult.answers = answers;
        newResult.participantId = participantId;
        newResult.author = quiz.user;

        await this.resultRepository.save(newResult);
        return newResult;
    }
    
    async getResult(resultId: number): Promise<any> {
        const result = await this.resultRepository.findOne({where: {id: resultId}});
        return result;
    }

}
