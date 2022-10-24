import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

interface IPayload{
  id:string
}

class Authenticator {
  public generate = ({id}: IPayload) => {
    const token = jwt.sign(
      {
        id,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: '24d'
      },
    );

    return token;
  };

  public getData = (token: string):IPayload => {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as IPayload;

    return {
      id: payload.id,
    };
  };
}

export default Authenticator;
