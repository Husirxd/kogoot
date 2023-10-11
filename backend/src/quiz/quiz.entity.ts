import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from 'typeorm';
import { Question } from '../question/question.entity';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  status: string;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @ManyToOne(() => User, (user) => user.quizzes)
  user: User;

  @ManyToMany(() => Category, (category) => category.quizzes)
  categories: Category[];
}
