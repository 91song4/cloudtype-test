import { Test, TestingModule } from '@nestjs/testing';
import { CustService } from './cust.service';

describe('CustService', () => {
  let service: CustService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustService],
    }).compile();

    service = module.get<CustService>(CustService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
