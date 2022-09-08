import { UserDto } from "./user.dto";

export class ContentDto{

    _id: string;

    date: Date;

    message: string;

    user: UserDto;
    
}