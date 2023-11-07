// quiz.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Transaction, In } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Question } from '../question/question.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ValidateQuizDto } from './dto/validate-quiz.dto';
import { Answer } from 'src/answer/answer.entity';
import { User } from 'src/users/users.entity';
import { Category } from 'src/category/category.entity';
import { v4 as uuidv4 } from 'uuid';
import { ImageService } from '../image/image.service';
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

    private readonly imageService: ImageService,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto, images: Array<string>): Promise<Quiz> {

    const userId = createQuizDto.userId;
    createQuizDto.uid = uuidv4();

    if(!userId || userId == undefined) return;
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
      console.log(images);
    await this.quizRepository.save(quiz);   
    const questions = createQuizDto.questions.map((question,index) =>
      this.questionRepository.create({
        ...question,
        image: images[index],
        quiz,
      }),
    );
    


    
    await this.questionRepository.save(questions);


    
    const answers = questions.map(question =>
      question.answers.map(answer =>
        this.answerRepository.create({
          ...answer,
          question
        }),
      ),
    );

    await this.answerRepository.save(answers.flat());
    return quiz;
  }


  async updateQuiz(updateQuizDto: UpdateQuizDto): Promise<Quiz | null> {
    const quizId = updateQuizDto.id; // Assuming you have a way to identify the quiz to update
    const quiz = await this.quizRepository.findOne({where: {id: quizId}});
  
    if (!quiz) {
      return null; // Quiz not found
    }
  
    // You can add validation and error handling for permissions or other criteria here
  
    // Update the basic quiz properties
    quiz.title = updateQuizDto.title;
    quiz.description = updateQuizDto.description;
    quiz.status = updateQuizDto.status;

    // Update the categories
    // TODO:: add categories to dto
    // const categoryIds = updateQuizDto.categoriesIds;
    // const categories = await this.categoryRepository.findBy({id: In(categoryIds)});
    // quiz.categories = categories;



    //Update question 
    const questions = updateQuizDto.questions.map(question =>
      this.questionRepository.create({
        ...question,
        quiz,
      }),
    );
    await this.questionRepository.save(questions);
  
    // Update the answers
    const answers = questions.map(question =>
      question.answers.map(answer =>
        this.answerRepository.create({
          ...answer,
          question,
        }),
      ),
    );
    await this.answerRepository.save(answers.flat());
    await this.quizRepository.save(quiz);
  
    return quiz;
  }

  async uploadImages(files: Array<Express.Multer.File>): Promise<Array<string>> {
    let images = [];
    for (const file of files) {
      const image = await this.imageService.uploadImage(file);
      images.push(image);
    }
    return images;
  }

  async getQuiz(quizId: Number): Promise<Quiz> {
    return this.quizRepository.createQueryBuilder('quiz')
    .where('quiz.id = :quizId', { quizId })
    .leftJoinAndSelect('quiz.questions', 'questions')
    .leftJoinAndSelect('questions.answers', 'answers')
    .leftJoinAndSelect('quiz.categories', 'categories')
    .getOne();
  }

  async getQuizByUid(uid: string): Promise<Quiz> {
    return this.quizRepository.createQueryBuilder('quiz')
    .where('quiz.uid = :uid', { uid })
    .leftJoinAndSelect('quiz.questions', 'questions')
    .leftJoinAndSelect('questions.answers', 'answers')
    .leftJoinAndSelect('quiz.categories', 'categories')
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

  async deleteQuiz(uid: string): Promise<Quiz> {
    //delete quiz along with questions and answers 
    const quiz = await this.quizRepository.createQueryBuilder('quiz')
    .where('quiz.uid = :uid', { uid })
    .leftJoinAndSelect('quiz.questions', 'questions')
    .leftJoinAndSelect('questions.answers', 'answers')
    .getOne();

    await this.quizRepository.remove(quiz);
    return quiz;
    
  }

}
