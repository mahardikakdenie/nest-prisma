import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestUpdateUser, RequestUser } from 'types/user';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {
    console.info('cREATE uSER rePOSITORY');
  }

  async save(user: RequestUser): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email: user?.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
        deletedAt: null,
      },
    });
  }
  async updateUser(user: RequestUpdateUser, id: number): Promise<User> {
    return await this.prismaService?.user?.update({
      where: {
        id: Number(id) || undefined,
      },
      data: {
        email: user?.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
      },
    });
  }

  async deleteUser(id: number): Promise<User> {
    return await this.prismaService?.user?.update({
      where: {
        id: Number(id) || undefined,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      where: {
        deletedAt: null,
      },
    });
  }
}
