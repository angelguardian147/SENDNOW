
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Contents } from "./content.schema";
import { Users } from "./user.schema";

export type ChatDocument = Chats & mongoose.Document;

@Schema()
export class Chats{

    @Prop()
    type: string;

    @Prop()
    name: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    users: Users[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Content'}]})
    contents: Contents[];

}

export const Chat = SchemaFactory.createForClass(Chats);