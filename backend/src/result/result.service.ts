import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './result.entity';
import { ValidateQuizDto } from 'src/quiz/dto/validate-quiz.dto';
import { v4 as uuidv4 } from 'uuid';
import { Quiz } from 'src/quiz/quiz.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class ResultService {

    constructor(
        @InjectRepository(Result)
        private readonly resultRepository: Repository<Result>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async createResult(result: ValidateQuizDto, quiz: Quiz, score: number): Promise<any> {

        const uid = uuidv4();
        const newResult = new Result();
        const answers = JSON.stringify(result.questions);
        const participantId = result.participantId ? result.participantId : null;
        if(participantId === quiz.user.id) return;
        newResult.uid = uid;
        newResult.quiz = quiz;
        newResult.score = score;
        newResult.answers = answers;
        newResult.participantId = participantId;
        newResult.author = quiz.user;

        await this.resultRepository.save(newResult);
        return newResult;
    }
    
    async checkAuthor(resultId: string, userId: number): Promise<boolean> {
        const result = await this.resultRepository.findOne({where: {uid: resultId}, relations: ['author']});
        if(result.author.id === userId) return true;
        return false;
    }

    async getResult(resultId: string, userId: number): Promise<any> {
        
        const fullResults = [];
        const result = await this.resultRepository.createQueryBuilder('result')
        .where('result.uid = :uid', {uid: resultId})
        .where('result.authorId = :userId', {userId: userId})
        .orderBy('result.participatedAt', 'DESC')
        .limit(30)
        .getMany();

        //foreach result, get the participantId and if is not null get the user
        for(let i = 0; i < result.length; i++) {
            const participantId = result[i].participantId;
            if(participantId) {
                const user = await this.userRepository.findOne({where: {id: participantId}});
                fullResults[i] = {
                    ...result[i],
                    participant: {
                        id: user.id,
                        nickname: user.nickname,
                        avatar: user.avatar
                    }
                }
            } else {
                fullResults[i] = result[i];
            }
        }

        return fullResults;
    }

}