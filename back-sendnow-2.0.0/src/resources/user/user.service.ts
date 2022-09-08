import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ClientDto } from 'src/dto/client.dto';
import { UserDto } from 'src/dto/user.dto';
import { IClient } from 'src/interfaces/client.interface';
import { IUser } from 'src/interfaces/user.interface';
import { ClientService } from '../client/client.service';
import { PersonalListService } from '../client/personal-list.service';

@Injectable()
export class UserService {

    constructor(@Inject('USER_MODEL') private userModel: Model<IUser>,
                private clientService: ClientService,
                private personalListService: PersonalListService){}

    //this method creates an user
    async create(userDto: UserDto): Promise<{}>{
        try {
            const client = await this.clientService.createData(userDto.client);
            const user_created = await this.createUser(client, userDto);
            const payload = { username: user_created.userName, email: client.email};
            return payload;
        } catch (error) {
            return error;
        }
    }

    async createUser(client: ClientDto, userDto: UserDto): Promise<IUser>{
        try {
            if (client) {
                userDto.client = client;
                const createUser = new this.userModel(userDto);
                const result = await createUser.save();
                return result
            }
        } catch (error) {
            return error;
        }
    }

    //this method gets the username and returns one user
    async findOne(userName: string): Promise<IUser>{
        try{
            const result = await this.userModel.findOne({userName: userName})
                                            .populate('client')
                                            .setOptions({sanitizeFilter: true})
                                            .exec();
            return result;
        }catch(error){
            return error;
        }
    }
    
    //this method gets the email and returns the username
    async findOneEmail(email: string): Promise<string>{
        try {
            const [result] = await this.userModel.aggregate([
                {
                  $lookup: {
                    from: 'clients',
                    localField: 'client',
                    foreignField: '_id',
                    as: 'contacts'
                  }
                },
                {
                    $match: {
                        'contacts.email': email
                    }
                },
                {
                    $project: {
                        _id: 0,
                        userName: 1
                    }
                }
              ]) || undefined;
            return result?.userName;
        } catch (error) {
            return error;
        }
    }

    //this method gets the email and returns one user
    async findOneByEmail(email: string): Promise<IUser>{
        try{
            const [result] = await this.userModel.aggregate([
                {
                  $lookup: {
                    from: 'clients',
                    localField: 'client',
                    foreignField: '_id',
                    as: 'contacts'
                  }
                },
                {
                    $match: {
                        'contacts.email': email
                    }
                },
                {
                    $project: {
                        'contacts': 0
                    }
                }
              ]);
            return result;
        }catch(error){
            return error;
        }
    }

    //this method extracts all the contacts from the user
    async findAllContacts(email_user: string): Promise<IClient[]>{
        try {
            const contacts: IClient[] = await this.clientService.findAllContacts(email_user);
            return contacts;
        } catch (error) {
            return error;
        }
    }

    
    //this method extracts all the contacts from the user
    async findAllPrivateContacts(email_user: string): Promise<IClient[]>{
        try {
            const contacts: IClient[] = await this.personalListService.findAllContacts(email_user);
            return contacts;
        } catch (error) {
            return error;
        }
    }

}
 