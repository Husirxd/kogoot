
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private jwtService: JwtService
  ) {}

  async findOne(email: string): Promise<User | undefined | any> {
    return this.usersRepository.createQueryBuilder('user')
    .where('user.email = :email', { email })
    .getOne();
  }

  async getUser(id: number): Promise<any> {
    const user = await this.usersRepository.findOne({where: {id: id}});
    return user;
  }


  async createUser(email: string, password: string, nickname: string, uid: string, avatar: string): Promise<any> {
    password = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ email, password, nickname, uid, avatar});
    await this.usersRepository.save(user);
    const newUser = {
      id: user.id,
      email: user.email,
      password: user.password,
      nickname: user.nickname,
      token: await this.jwtService.signAsync({ sub: user.id, email: user.email }),
    }

    return newUser;
  }


}