import { UserDto } from "./user.dto";

export class ClientDto{

    firstName: string;

    lastName: string;

    tel: number;

    estado: string;

    address: string;

    charge: string;

    company: string;

    email: string;

    personalList: ClientDto[];

    contacts: ClientDto[];

    user: UserDto;

}