import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ClientDto } from 'src/dto/client.dto';
import { IClient } from 'src/interfaces/client.interface';
import { ResultResponse } from 'src/interfaces/result-response';
import { ClientService } from './client.service';

@Injectable()
export class PersonalListService {

    constructor(@Inject('CLIENT_MODEL') private clientModel: Model<IClient>,
                                        private clientService: ClientService){}
    
    //add contacts into client´s personal list
    async addPersonalList(id: string, client: ClientDto): Promise<boolean>{
        try{
            const result = await this.clientModel.updateOne({
                _id: id
            },
            {
                $push:{
                    personalList: client
                }
            })
            .setOptions({sanitizeFilter: true})
            .exec();
            if(!result.modifiedCount){
                return false;
            }
            return true;
        }catch(error){
            return error;
        }
    }

    //create a new client and add it into a user
    async addNewContact(email: string, contact: ClientDto): Promise<ResultResponse>{
        try{
            const client = new this.clientModel(contact);
            const user_client = await this.clientService.findOne(email);
            if(client && user_client){
                const updClient = await this.addPersonalList(user_client._id, client);
                return updClient? { code: 200, message: 'Ok' } : { code: 500, message: 'ERROR' };
            }
            return { code: 500, message: 'ERROR' };
        }catch(error){
            return error;
        }
    }
    
    //find the clients in the private list by the param var
    async findParam(email_user: string, param: string): Promise<IClient[]>{
        try{
            const { personalList }: IClient = await this.clientModel.findOne(
                {
                    email: email_user,
                    $and: [
                        {
                            $or: [
                                {'personallList.firstName': param}, 
                                {'personallList.lastName': param}, 
                                {'personallList.charge': param},
                                {'personallList.company': param},
                                {'personallList.address': param},
                                {'personallList.email': param}
                            ]
                        }
                    ]
                },
                {
                    personalList: 1,
                    _id: 0
                }
            )
            .setOptions({sanitizeFilter: true})
            .exec();
            return personalList;
        }catch(error){
            return error;
        }
    }
    
    //this method extracts all the contacts from the user
    async findAllContacts(email_user: string): Promise<IClient[]>{
        try {
            const { personalList }: IClient = await this.clientModel.findOne(
                {
                    email: email_user
                },
                {
                    personalList: 1,
                    _id: 0
                }
            )
            .setOptions({sanitizeFilter: true})
            .exec();
            return personalList;
        } catch (error) {
            return error;
        }
    }

}
