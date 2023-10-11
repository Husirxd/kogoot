// quiz.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Transaction } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Question } from '../question/question.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ValidateQuizDto } from './dto/validate-quiz.dto';
import { Answer } from 'src/answer/answer.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepository.create(createQuizDto);
    await this.quizRepository.save(quiz);

    const questions = createQuizDto.questions.map(question =>
      this.questionRepository.create({
        ...question,
        quiz,
      }),
    );
    await this.questionRepository.save(questions);

    const answers = questions.map(question =>
      question.answers.map(answer =>
        this.answerRepository.create({
          ...answer,
          question,
        }),
      ),
    );

    await this.answerRepository.save(answers.flat());

    return quiz;
  }


  async getQuiz(quizId: Number): Promise<Quiz> {
    return this.quizRepository.createQueryBuilder('quiz')
    .where('quiz.id = :quizId', { quizId })
    .leftJoinAndSelect('quiz.questions', 'questions')
    .leftJoinAndSelect('questions.answers', 'answers')
    .getOne();
  }

  async getQuizzes(limit: number): Promise<Quiz[]> {
    return this.quizRepository.find({
      take:limit,
    });
  }

  async validateQuiz(body: ValidateQuizDto): Promise<Object> {
    let score = 0;
    let quizId = body.quizId;
    const quiz = this.quizRepository.createQueryBuilder('quiz')
    .where('quiz.id = :quizId', { quizId })
    .leftJoinAndSelect('quiz.questions', 'questions')
    .leftJoinAndSelect('questions.answers', 'answers')
    .getOne();

    let results = {
      score: 0,
    };

    (await quiz).questions.forEach(question => {
      body.questions.forEach(bodyQuestion => {
        if (question.id === bodyQuestion.questionId) {
          question.answers.forEach(answer => {
            if (answer.id === bodyQuestion.chosenAnswerId && answer.isCorrect) {
              score++;
            }
          });
        }
      });
    }); 

    results.score = score;
    return results;
  }


}
