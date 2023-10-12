
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    console.log(email)
    return this.usersRepository.createQueryBuilder('user')
    .where('user.email = :email', { email })
    .getOne();
  }

  async createUser(email: string, password: string, nickname: string): Promise<User> {
    password = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ email, password, nickname });
    await this.usersRepository.save(user);
    return user;
  }


}