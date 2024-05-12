import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestUser } from 'types/user';

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
      },
    });
  }
  async getUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }
}
