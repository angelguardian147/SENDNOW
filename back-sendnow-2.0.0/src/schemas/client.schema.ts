import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Users } from './user.schema';

export type ClientDocument = ClientS & Document;

@Schema()
export class ClientS{

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    tel: number;

    @Prop()
    estado: string;

    @Prop()
    address: string;

    @Prop()
    charge: string;

    @Prop()
    company: string;

    @Prop()
    email: string;

    @Prop()
    personalList: [ClientS];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Client'}]})
    contacts: ClientS[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    _user: Users;

}

export const Client = SchemaFactory.createForClass(ClientS);