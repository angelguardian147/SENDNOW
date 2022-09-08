import { ContentDto } from "./content.dto";
import { UserDto } from "./user.dto";

export class ChatDto{

    _id: string;

    type: string;

    name: string;

    users: UserDto[];

    contents: ContentDto[];
    
}