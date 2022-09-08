
import { Document } from 'mongoose';
import { IUser } from './user.interface';

export interface IContent extends Document{

    readonly _id: string;
    readonly date: Date;
    readonly message: string;
    readonly user: IUser;

}