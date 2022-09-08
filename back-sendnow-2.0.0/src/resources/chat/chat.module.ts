import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ChatController } from './chat.controller';
import { chatProviders } from './chat.providers';
import { ChatService } from './chat.service';

@Module({
  imports: [DatabaseModule],
  providers: [ChatService, ...chatProviders],
  controllers: [ChatController],
  exports: [ChatService]
})
export class ChatModule {}
