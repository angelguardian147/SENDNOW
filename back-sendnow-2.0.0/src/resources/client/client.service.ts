import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ClientDto } from 'src/dto/client.dto';
import { IClient } from 'src/interfaces/client.interface';
import { ResultResponse } from 'src/interfaces/result-response';

@Injectable()
export class ClientService {

    constructor(@Inject('CLIENT_MODEL') private clientModel: Model<IClient>){}

    // creating a contact
    async createData(clientDto: ClientDto): Promise<IClient>{
        try{
            const createClient = new this.clientModel(clientDto);
            const result = await createClient.save();
            return createClient;
        }catch(error){
            return error;
        }
    }

    //find the clients by the param var
    async findParam(email_user: string, param: string): Promise<IClient[]>{
        try{
            const { contacts } = await this.clientModel.findOne(
                {
                    email: email_user
                },
                {
                    contacts: 1,
                    _id: 0
                }
            )
            .populate(
                {
                    path: 'contacts',
                    match: {
                        $or: [
                            {firstName: param}, 
                            {lastName: param}, 
                            {charge: param},
                            {company: param},
                            {address: param},
                            {email: param}
                        ]
                    }
                }
            )
            .setOptions({sanitizeFilter: true})
            .exec();
            return contacts;
        }catch(error){
            return error;
        }
    }
    
    //this method extracts all the contacts from the user
    async findAllContacts(email_user: string): Promise<IClient[]>{
        try {
            const { contacts }: IClient = await this.clientModel.findOne(
                {
                    email: email_user
                },
                {
                    contacts: 1,
                    _id: 0
                }
            )
            .populate('contacts')
            .setOptions({sanitizeFilter: true})
            .exec();
            return contacts;
        } catch (error) {
            return error;
        }
    }

    //find a client by the email and return it
    async findOne(email: string): Promise<IClient>{
        try{
            const client = await this.clientModel.findOne({email: email})
            .setOptions({sanitizeFilter: true})
            .exec();
            return client;
        }catch(error){
            return error;
        }
    }

    //add contacts into a client
    async updateContacts(id: string, client: ClientDto): Promise<boolean>{
        try{
            const result = await this.clientModel.updateOne({
                _id: id
            },
            {
                $push:{
                    contacts: client
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

    //join an existent user with a user
    async addContact(email: string, email_contact: string): Promise<ResultResponse>{
        try{
            const user_contact = await this.findOne(email_contact);
            const user_client = await this.findOne(email);
            if(user_contact && user_client){
                const updUser = await this.updateContacts(user_client._id, user_contact);
                if(updUser){
                    const updClient = await this.updateContacts(user_contact._id, user_client);
                    return updClient? { code: 200, message: 'Ok' } : { code: 500, message: 'ERROR' };
                }
            }
            return { code: 500, message: 'ERROR' };
        }catch(error){
            return error;
        }
    }

    //update the client´s data
    async update(email_contact: string, ClientDto: ClientDto): Promise<ResultResponse>{
        try {
            const result = await this.clientModel.updateOne(
                {
                    email: email_contact
                },
                {
                    $set: {
                        firstName: ClientDto.firstName,
                        lastName: ClientDto.lastName,
                        tel: ClientDto.tel,
                        estado: ClientDto.estado,
                        address: ClientDto.address,
                        charge: ClientDto.charge,
                        company: ClientDto.company,
                        email: ClientDto.email
                    }
                }
            )
            .setOptions({sanitizeFilter: true})
            .exec();
            if(!result.modifiedCount){
                return { code: 500, message: 'ERROR' };
            }
            return { code: 200, message: 'OK' };
        } catch (error) {
            return error;
        }
    }

    //delete an client
    async delete(email: string):Promise<boolean>{
        try{
            const result = await this.clientModel.deleteOne({email: email})
            .setOptions({sanitizeFilter: true})
            .exec();
            if(!result.deletedCount){
                return false;
            }
            return true;
        }catch(error){
            return error;
        }
    }

    //delete one contact from the contact´s list
    async deleteContactsByEmail(id: string, email_user: string): Promise<boolean>{
        try{
            const result = await this.clientModel.updateOne(
                {
                    email: email_user
                },
                {
                    $pull: {
                        'contacts': id
                    }
                }
            )
            if(!result.modifiedCount){
                return false;
            }
            return true;
        }catch(error){
            return error;
        }
    }

    //confirm the number de contacts in the client to delete
    async confirmDelete(email: string): Promise<number>{
        try{
            const [{count}] = await this.clientModel.aggregate(
                [
                    {
                        $match: {
                            email: email
                        }
                    },
                    {
                        $project: {
                            count: {
                                $size: '$contacts'
                            },
                            '_id': 0
                        }
                    }
                ]
            );
            return count;
        }catch(error){
            return error;
        }
    }

    //elimina un contacto de la lista de contactos de un usuario
    async deleteContacts(email_contact: string, email_user: string): Promise<ResultResponse>{
        try{
            const contactNumber = await this.confirmDelete(email_contact);
            if(contactNumber > 1){
                const user_client = await this.clientModel.findOne({ email: email_user }, { _id:1 });
                const user_contact = await this.clientModel.findOne({ email: email_contact }, { _id:1 });
                if(user_client && user_contact){
                    const deleteClient = await this.deleteContactsByEmail(user_client._id, email_contact);
                    if(deleteClient){
                        const deleteContact = await this.deleteContactsByEmail(user_contact._id, email_user);
                        return deleteContact? { code: 200, message: 'OK' } : { code: 500, message: 'ERROR' };
                    }
                }
            }else{
                const deleteContact = await this.delete(email_contact);
                return deleteContact? { code: 200, message: 'OK' } : { code: 500, message: 'ERROR' };
            }
            return { code: 500, message: 'ERROR' };
        }catch(error){
            return error;
        }
    }

}
