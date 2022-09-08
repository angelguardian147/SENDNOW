import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientService } from 'src/resources/client/client.service';
import { UserService } from 'src/resources/user/user.service';

@Injectable()
export class EmailGuard implements CanActivate {

  constructor(private userService: UserService){}

  async canActivate( context: ExecutionContext ): Promise<any> {
    const user = context.switchToHttp().getRequest();
    const result = await this.userService.findOneEmail(user.body.client.email);
    if(result !== undefined || result !== null){
      return user.body;
    }else{
      throw new HttpException('This Email Already Exist!', HttpStatus.FORBIDDEN);
    }
  }

}
