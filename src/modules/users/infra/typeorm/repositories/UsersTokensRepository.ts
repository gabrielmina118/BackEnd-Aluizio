import { getRepository, Repository } from 'typeorm';
import {
  IUserToken,
  IUserTokenRepository,
} from '../../../domain/IUserTokenRepository';
import UserToken from '../model/UserToken';

export class UsersTokensRepository implements IUserTokenRepository {

  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
