import { Test, TestingModule } from '@nestjs/testing';
import { OverService } from './over.service';

describe('OverService', () => {
  let service: OverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OverService],
    }).compile();

    service = module.get<OverService>(OverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
