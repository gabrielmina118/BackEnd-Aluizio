import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../model/UserToken';

@EntityRepository(UserToken)
export class UsersTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }

  public async generete(user_id: string): Promise<UserToken | undefined> {

    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }
}
