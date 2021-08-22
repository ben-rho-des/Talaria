import { RetrieveUser, User } from '../models/user';

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name'>;

export class UsersService {
  public async get(id: number, name?: string): Promise<User> {
    try {
      console.log('id', id, ' | name', name);
      const user = await RetrieveUser({});

      return user[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: 'Happy',
      ...userCreationParams,
    };
  }
}
