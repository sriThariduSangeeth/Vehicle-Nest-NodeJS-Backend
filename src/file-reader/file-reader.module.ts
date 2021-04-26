import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileReaderController } from './file-reader.controller';
import { FileREaderProcessor } from './file-reader.processor';
import { FileReaderService } from './file-reader.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'fileQueue'
    }),
    MulterModule.register({
      dest: './uploaddata',
    }),
  ],
  controllers: [FileReaderController],
  providers: [FileReaderService, FileREaderProcessor],
})
export class FileReaderModule { }