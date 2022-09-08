

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Chats } from "./chat.schema";
import { Users } from "./user.schema";

export type ContentDocument = Contents & mongoose.Document;

@Schema()
export class Contents{

    @Prop()
    date: Date;

    @Prop()
    message: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: Users;

}

export const Content = SchemaFactory.createForClass(Contents);