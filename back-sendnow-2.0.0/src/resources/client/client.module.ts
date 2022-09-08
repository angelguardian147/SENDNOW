import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ClientController } from './client.controller';
import { clientProviders } from './client.providers';
import { ClientService } from './client.service';
import { PersonalListService } from './personal-list.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [ClientService, PersonalListService, ...clientProviders],
  exports: [ClientService, PersonalListService]
})
export class ClientModule {}
