import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Question } from '../question/question.entity';
import { Category } from '../category/category.entity';
import { User } from '../users/users.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  status: string;

  @OneToMany(() => Question, (question) => question.quiz,  { cascade: true, onDelete: 'CASCADE' })
  questions: Question[];

  @ManyToOne(() => User, (user) => user.quizzes, { cascade: true, onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Category,  { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  categories: Category[];
}
