import { compare, genSalt, hash } from 'bcryptjs';

class HashManager {
  async hash(password: string): Promise<string> {
    const cost = 12;
    const salt = await genSalt(cost);
    const hashPassword = await hash(password, salt);

    return hashPassword;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const hashCompare = await compare(password, hash);
    return hashCompare;
  }
}

export default HashManager;
