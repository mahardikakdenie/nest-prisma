import { User } from '@prisma/client';

export interface RequestUser {
  email: string;
  first_name: string;
  last_name?: string;
}

export interface ResponseUser {
  meta: {
    message: string;
  };
  data: User;
}

export interface ResponseUsers {
  meta: {
    message: string;
  };
  data: User[];
}
