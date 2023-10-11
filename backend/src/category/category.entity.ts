// src/category/category.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  categoryName: string;

  @ManyToMany(() => Quiz, (quiz) => quiz.categories)
  quizzes: Quiz[];
}
