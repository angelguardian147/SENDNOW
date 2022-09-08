import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super();
  }

  //username and password must be the same that in the method find() in the front
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
        throw new UnauthorizedException(HttpStatus.FORBIDDEN, 'El nombre de usuario o la contraseña son incorrectos!');
    }
    return user;
  }

}