import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { User } from '../users/users.entity';

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    uid: string;    

    @Column({ nullable: true })
    participantId?: number;

    @Column()
    score: number;

    @Column('jsonb', { nullable: false, default: {}})
    answers: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    participatedAt: Date;

    @ManyToOne(() => User)
    author: User;

    @ManyToOne(() => Quiz)
    quiz: Quiz;
}