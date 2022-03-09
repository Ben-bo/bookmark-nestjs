//this is a costumes guard
import { AuthGuard } from '@nestjs/passport';

//jwt name comes from startegy
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super({});
  }
}
