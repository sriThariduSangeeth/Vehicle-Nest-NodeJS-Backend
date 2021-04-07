import { Test, TestingModule } from '@nestjs/testing';
import { FileReaderController } from './file-reader.controller';

describe('FileReaderController', () => {
  let controller: FileReaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileReaderController],
    }).compile();

    controller = module.get<FileReaderController>(FileReaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
