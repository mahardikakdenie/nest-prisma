import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
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
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body('email') email: string,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
  ): Promise<ResponseUser> {
    try {
      if (id) {
        const data = {
          email,
          last_name,
          first_name,
        };

        const response = await this?.userService?.updateUsers(data, id);
        return {
          meta: {
            message: 'Update Data Success',
          },
          data: response,
        };
      } else {
        throw new HttpException('Id Not Found', HttpStatus.AMBIGUOUS);
      }
    } catch (error) {
      throw new HttpException(
        'Failed to update data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<ResponseUser> {
    try {
      if (!id) {
        throw new HttpException('Failed Id', HttpStatus.BAD_REQUEST);
      }

      const response = await this.userService?.deleteUser(id);
      return {
        meta: {
          message: 'Success delete User',
        },
        data: response,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
