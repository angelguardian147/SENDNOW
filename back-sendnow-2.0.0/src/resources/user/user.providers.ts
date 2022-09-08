import { Connection } from "mongoose";
import { User } from "src/schemas/user.schema";


 export const userProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('User', User),
        inject: ['DATABASE_CONNECTION'],
    }
 ];