import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { Answer } from '../answer/answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {onDelete: 'CASCADE' })
  quiz: Quiz;

  @OneToMany(() => Answer, (answer) => answer.question, {onDelete: 'CASCADE' })
  answers: Answer[];
}