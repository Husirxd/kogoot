// quiz.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Transaction, In } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Question } from '../question/question.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ValidateQuizDto } from './dto/validate-quiz.dto';
import { Answer } from 'src/answer/answer.entity';
import { User } from 'src/users/users.entity';
import { Category } from 'src/category/category.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {

    const userId = createQuizDto.userId;
    const user = await this.userRepository.find({where: {id: userId}});
    if(!user) return null;
  
    const categoryIds = createQuizDto.categoriesIds;
    const categories = await this.categoryRepository.findBy({id: In(categoryIds)});
    console.log(categories);
    const quiz = this.quizRepository.create({
      ...createQuizDto,
      user: user[0],
      categories: categories,
      });
  
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

  async getQuizzes(limit: number, offset: number): Promise<Quiz[]> {
    return this.quizRepository.createQueryBuilder('quiz')
    .limit(limit)
    .offset(offset)
    .leftJoinAndSelect('quiz.categories', 'categories')
    .orderBy('quiz.createdAt', 'DESC')
    .getMany();
  }

  async searchQuizzes(search: string): Promise<Quiz[]> {
    return this.quizRepository.createQueryBuilder('quiz')
    .where('quiz.title LIKE :search', { search: `%${search}%` })
    .leftJoinAndSelect('quiz.categories', 'categories')
    .orderBy('quiz.createdAt', 'DESC')
    .getMany();
  }

  async getQuizzesByUser(userId: number): Promise<Quiz[]> {
    return  this.quizRepository.createQueryBuilder('quiz')
    .leftJoinAndSelect('quiz.questions', 'questions')
    .leftJoinAndSelect('questions.answers', 'answers')
    .leftJoinAndSelect('quiz.user', 'user')
    .where('user.id = :userId', { userId })
    .getMany();
  }

  async getQuizzesByCategory(categoryId: number): Promise<Quiz[]> {
    return this.quizRepository.createQueryBuilder('quiz')
    .leftJoinAndSelect('quiz.questions', 'questions')
    .leftJoinAndSelect('questions.answers', 'answers')
    .leftJoinAndSelect('quiz.categories', 'categories')
    .where('categories.id = :categoryId', { categoryId })
    .getMany();

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
