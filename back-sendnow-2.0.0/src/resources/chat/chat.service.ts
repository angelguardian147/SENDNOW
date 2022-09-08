import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ChatDto } from 'src/dto/chat.dto';
import { IChat } from 'src/interfaces/chat.interface';

@Injectable()
export class ChatService {

    constructor(@Inject('CHAT_MODEL') private chatModel: Model<IChat>){}

    async create(user_email: string, chat: ChatDto): Promise<any>{
        try{
            
        }catch(error){
            return error;
        }
    }

    async findAll(user_email: string): Promise<IChat[]>{
        try{
            const result = await this.chatModel.find({users: user_email})
                .populate('users', 'contents')
                .setOptions({sanitizeFilter: true})
                .exec();
            return result;
        }catch(error){
            return error;
        }
    }

}
