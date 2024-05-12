import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RequestUser } from 'types/user';
import { User } from '@prisma/client';

interface user {
  _id: number;
  name: string;
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  getHello(): user {
    return {
      _id: 1,
      name: 'Halo',
    };
  }
  getDataUser(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
  createUser(user: RequestUser): Promise<User> {
    return this.userRepository.save(user);
  }
}
