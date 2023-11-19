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

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Question, (question) => question.quiz,  {onDelete: 'CASCADE' })
  questions: Question[];

  @ManyToOne(() => User, (user) => user.quizzes)
  user: User;

  @ManyToMany(() => Category,  {onDelete: 'CASCADE' })
  @JoinTable()
  categories: Category[];
}
