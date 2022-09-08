
import { Client } from "./client";

export interface Login{
    _id?: string;
    userName?: string;
    password?: string;
    client?: Client;
}