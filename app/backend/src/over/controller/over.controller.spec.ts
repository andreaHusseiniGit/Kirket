import { Test, TestingModule } from '@nestjs/testing';
import { OverController } from './over.controller';

describe('Over Controller', () => {
  let controller: OverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OverController],
    }).compile();

    controller = module.get<OverController>(OverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
