import * as sequelize from 'sequelize';
import * as Database from '../database';

export interface User {
  id: number;
  email: string;
  name: string;
  status?: 'Happy' | 'Sad';
}

export const RetrieveUser = async (filter: Partial<sequelize.WhereOptions<User>>): Promise<User[]> => {
  try {
    const where: any = {
      deletedAt: null,
      ...filter,
    };

    const rows = await Database.Users.findAll({ where });

    return rows as any;
  } catch (error) {
    throw new Error('DB error ' + error);
  }
};
