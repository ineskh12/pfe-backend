import { Test, TestingModule } from '@nestjs/testing';
import { GridsController } from './grids.controller';

describe('GridsController', () => {
  let controller: GridsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GridsController],
    }).compile();

    controller = module.get<GridsController>(GridsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
