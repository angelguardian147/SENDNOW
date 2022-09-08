import { Test, TestingModule } from '@nestjs/testing';
import { PersonalListService } from './personal-list.service';

describe('PersonalListService', () => {
  let service: PersonalListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalListService],
    }).compile();

    service = module.get<PersonalListService>(PersonalListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
