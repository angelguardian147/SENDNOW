import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserController } from './resources/user/user.controller';
import { UserModule } from './resources/user/user.module';
import { ClientController } from './resources/client/client.controller';
import { ClientModule } from './resources/client/client.module';
import { AuthModule } from './auth/auth.module';
import { PersonalListService } from './resources/client/personal-list.service';
import { ChatGateway } from './resources/chat/chat.gateway';
import { ChatController } from './resources/chat/chat.controller';
import { ChatModule } from './resources/chat/chat.module';

@Module({
  imports: [DatabaseModule, UserModule, ClientModule, AuthModule, ChatModule],
  controllers: [AppController, UserController, ClientController, ChatController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
