

export interface Client{
    _id?: string;
    firstName: string;
    lastName?: string;
    charge?: string;
    company?: string;
    email?: string;
    estado?: string;
    address?: string;
    tel?: number;
    contacts?: Client[];
}