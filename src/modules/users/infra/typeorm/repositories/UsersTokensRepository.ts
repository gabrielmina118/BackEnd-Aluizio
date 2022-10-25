import { getRepository, Repository } from 'typeorm';
import UserToken from '../model/UserToken';


export class UsersTokensRepository   {

  private ormRepository:Repository<UserToken>

  constructor(){
    this.ormRepository = getRepository(UserToken)
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }

  public async generete(user_id: string): Promise<UserToken> {

    const userToken = await this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
