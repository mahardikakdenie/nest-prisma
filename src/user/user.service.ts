import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RequestUpdateUser, RequestUser } from 'types/user';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async updateUsers(user: RequestUpdateUser, id: number): Promise<User> {
    return await this.userRepository?.updateUser(user, id);
  }
  getDataUser(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
  createUser(user: RequestUser): Promise<User> {
    return this.userRepository.save(user);
  }
  async deleteUser(id: number): Promise<User> {
    return await this?.userRepository?.deleteUser(id);
  }
}
