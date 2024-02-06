import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
  ){}

  async changePassword(userId: number, password: string) {

    password = await bcryptjs.hash(password,10);

    return this.userRepository.update({id:userId},{
      password:password
    });
  }

  async create(createUserDto: CreateUserDto) {

    const user = await this.findOneByEmail(createUserDto.email);
    
    if(user){
      throw new BadRequestException('El correo electronico ya existe');
    }
    createUserDto.password = await bcryptjs.hash(createUserDto.password,10);

    return this.userRepository.save(createUserDto);
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}