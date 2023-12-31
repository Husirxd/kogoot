import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  isCorrect: number;

  @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE' })
  question: Question;
}