import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Email } from 'src/auth/strategies/email.decorator';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { ClientDto } from 'src/dto/client.dto';
import { IClient } from 'src/interfaces/client.interface';
import { EmailPayload } from 'src/interfaces/email.payload';
import { ResultResponse } from 'src/interfaces/result-response';
import { ClientService } from './client.service';
import { PersonalListService } from './personal-list.service';

@Controller('client')
export class ClientController {

    constructor(private clientService: ClientService,
                private personalListService: PersonalListService){}

    @UseGuards(JwtAuthGuard)
    @Post('/addContact')
    async addContact(@Res() res, @Body('email_contact') email_contact: string, @Email() { email }: EmailPayload): Promise<ResultResponse>{
        const result = await this.clientService.addContact(email, email_contact);
        return res.status(HttpStatus.OK).json(
            {
                result
            }
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('/search/:param')
    async find(@Res() res, @Param('param') param: string, @Email() { email } : any): Promise<IClient[]>{
        const result = await this.clientService.findParam(email, param);
        return res.status(HttpStatus.OK).json(
            {
                result
            }
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('/findClient/:email')
    async findOne(@Res() res, @Param('email') email: string): Promise<IClient>{
        const result = await this.clientService.findOne(email);
        return res.status(HttpStatus.OK).json(
            {
                result
            }
        );
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/update/:eamil')
    async update(@Res() res, @Param('eamil') email: string, @Body() contact: ClientDto): Promise<ResultResponse>{
        const result = await this.clientService.update(email, contact);
        return res.status(HttpStatus.OK).json(
            {
                result
            }
        )
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:email')
    async delete(@Res() res, @Param('email') email_contact: string, @Email() { email }: EmailPayload): Promise<ResultResponse>{
        const result = await this.clientService.deleteContacts(email_contact, email);
        return res.status(HttpStatus.OK).json(
            {
                result
            }
        );
    }

    // CRUD for personal list
    
    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async create(@Res() res, @Body() client: ClientDto, @Email() { email }: EmailPayload): Promise<ResultResponse>{
        const result = await this.personalListService.addNewContact(email, client);
        return res.status(HttpStatus.OK).json(
            {
                result
            }
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('/search_personal/:param')
    async findPersonalList(@Res() res, @Param('param') param: string, @Email() { email } : EmailPayload): Promise<IClient[]>{
        const result = await this.personalListService.findParam(email, param);
        return res.status(HttpStatus.OK).json(
            {
                result
            }
        );
    }

}
