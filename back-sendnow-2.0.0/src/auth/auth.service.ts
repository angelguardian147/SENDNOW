import { Injectable } from '@nestjs/common';
import { JwtResponse } from 'src/interfaces/jwt-response.interface';
import { UserService } from 'src/resources/user/user.service';
import { JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    userLog: JwtResponse;
    
    constructor(private jwtService: JwtService, private userService: UserService){}

    async validateUser(username: string, password: string): Promise<any>{
        const user = await this.userService.findOne(username);
        if(user && user.password === password){
            const userAlone = {
                email : user.client.email,
                username: user.userName
            }
            return userAlone;
        }
        return null;
    }

    async validateUserName(username: string): Promise<any>{
        const user = await this.userService.findOne(username);
        if(user){
            const userAlone = {
                email : user.client.email,
                username: user.userName
            }
            return userAlone;
        }
        return null;
    }

    async login(user: any){
        const payload = { username: user.username, email: user.email};
        this.userLog = {
            email: payload.email,
            username: payload.username,
            access_token: this.jwtService.sign(payload)
        };
        return this.userLog;
    }

}
