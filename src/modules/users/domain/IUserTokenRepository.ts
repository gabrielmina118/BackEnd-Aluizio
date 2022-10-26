import UserToken from "../infra/typeorm/model/UserToken";

export interface IUserToken {
  id: string;
  token: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
export interface IUserTokenRepository {
  findByToken(token: string): Promise<IUserToken | undefined>;
  generate(user_id: string): Promise<UserToken>;
}
