
import { Content } from "./content";

export interface Chat{

    _id?: string;
    type?: string;
    name: string;
    users_email: string[];
    content: Content[];

}