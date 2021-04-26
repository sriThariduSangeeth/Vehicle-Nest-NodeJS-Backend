import { Module } from '@nestjs/common';
import { FileReaderController } from './file-reader.controller';
import { FileReaderService } from './file-reader.service';

@Module({
  controllers: [FileReaderController],
  providers: [FileReaderService],
})
export class FileReaderModule { }
