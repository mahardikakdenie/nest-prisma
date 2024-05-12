import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseUser, ResponseUsers } from 'types/user';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getDataUser(): Promise<ResponseUsers> {
    try {
      const responses = await this.userService.getDataUser();
      return {
        meta: {
          message: 'Success',
        },
        data: responses,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to get users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
  ): Promise<ResponseUser> {
    try {
      const data = {
        email,
        first_name,
        last_name,
      };
      const response = await this.userService.createUser(data);
      return {
        meta: {
          message: 'User created successfully',
        },
        data: response,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
