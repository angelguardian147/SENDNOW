
import { Document } from 'mongoose';
import { IContent } from './content.interface';
import { IUser } from './user.interface';

export interface IChat extends Document{

    readonly _id: string;
    readonly type: string;
    readonly name: string;
    readonly users: IUser[];
    readonly contents: IContent[];

}