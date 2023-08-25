import { Test, TestingModule } from '@nestjs/testing';
import { CustController } from './cust.controller';

describe('CustController', () => {
  let controller: CustController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustController],
    }).compile();

    controller = module.get<CustController>(CustController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
