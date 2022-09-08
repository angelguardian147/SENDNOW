
import { ClientDto } from "./client.dto";

export class UserDto{

    _id: string;

    userName: string;

    password: string;

    client: ClientDto;

}