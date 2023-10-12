import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  quizzes: Quiz[];
}