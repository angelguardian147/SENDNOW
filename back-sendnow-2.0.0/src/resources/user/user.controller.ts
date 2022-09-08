import { Body, Controller, Get, HttpStatus, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Email } from 'src/auth/strategies/email.decorator';
import { EmailGuard } from 'src/auth/strategies/email.guard';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/strategies/local-auth.guard';
import { UsernameGuard } from 'src/auth/strategies/username.guard';
import { UserDto } from 'src/dto/user.dto';
import { IChat } from 'src/interfaces/chat.interface';
import { IClient } from 'src/interfaces/client.interface';
import { EmailPayload } from 'src/interfaces/email.payload';
import { JwtResponse } from 'src/interfaces/jwt-response.interface';
import { ResultResponse } from 'src/interfaces/result-response';
import { ChatService } from '../chat/chat.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private authService: AuthService, 
                private userService: UserService,
                private chatService: ChatService){}

    @UseGuards(UsernameGuard)
    @UseGuards(EmailGuard)
    @Post('/create')
    async create(@Body() user: UserDto): Promise<JwtResponse>{
        const result = await this.userService.create(user);
        return this.authService.login(result);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/list/:email')
    async findAll(@Res() res, @Email() { email }: EmailPayload): Promise<IClient[]> {
        const clients: IClient[] = await this.userService.findAllContacts(email);
        return res.status(HttpStatus.OK).json(
            {
                clients
            }
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('/personal_list/:email')
    async findAllPersonalList(@Res() res, @Email() { email }: EmailPayload): Promise<IClient[]> {
        const clients: IClient[] = await this.userService.findAllPrivateContacts(email);
        return res.status(HttpStatus.OK).json(
            {
                clients
            }
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('/finduser/:email')
    async getUserEmail(@Res() res, @Param('email') email: string): Promise<string>{
        const result = await this.userService.findOneEmail(email);
        return res.status(HttpStatus.OK).json(
            {
                result
            }
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('/chats/:email')
    async getChats(@Res() res, @Param('email') email: string): Promise<IChat[]>{
        const result = await this.chatService.findAll(email);
        return res.status(HttpStatus.OK).json(
            {
                result
            }
        );
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req){
        return req.user;
    }

    @Get('/authenticated')
    @UseGuards(JwtAuthGuard)
    getAuthenticated(){
        return true;
    }

}
