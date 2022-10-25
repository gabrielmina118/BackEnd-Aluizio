import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../model/User';

export class UserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
