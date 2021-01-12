import { Test, TestingModule } from '@nestjs/testing';
import { BallService } from './ball.service';

describe('BallService', () => {
  let service: BallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BallService],
    }).compile();

    service = module.get<BallService>(BallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
