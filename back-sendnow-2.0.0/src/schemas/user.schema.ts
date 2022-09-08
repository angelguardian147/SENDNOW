import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ClientS } from "./client.schema";


export type UserDocument = Users & Document;

@Schema()
export class Users{

    @Prop()
    userName: string;

    @Prop()
    password: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
    client: ClientS;

}

export const User = SchemaFactory.createForClass(Users);