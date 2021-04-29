import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileReaderGraphQLAPI } from './file-reader.api';
import { FileReaderController } from './file-reader.controller';
import { FileREaderProcessor } from './file-reader.processor';
import { FileReaderResolver } from './file-reader.resolver';
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
  providers: [FileReaderService, FileREaderProcessor, FileReaderGraphQLAPI, FileReaderResolver],
})
export class FileReaderModule { }
