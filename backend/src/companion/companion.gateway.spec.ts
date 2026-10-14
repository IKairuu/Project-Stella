import { Test, TestingModule } from '@nestjs/testing';
import { CompanionGateway } from './companion.gateway.js';

describe('CompanionGateway', () => {
  let gateway: CompanionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanionGateway],
    }).compile();

    gateway = module.get<CompanionGateway>(CompanionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
