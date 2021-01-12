import { Test, TestingModule } from '@nestjs/testing';
import { InningsController } from './innings.controller';

describe('Innings Controller', () => {
  let controller: InningsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InningsController],
    }).compile();

    controller = module.get<InningsController>(InningsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
