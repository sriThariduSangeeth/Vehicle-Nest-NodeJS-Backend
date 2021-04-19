import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileReaderController } from './file-reader.controller';
import { FileREaderProcessor } from './file-reader.processor';
import { FileReaderProducerService } from './file-reader.producer.service';


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
  providers: [FileReaderProducerService, FileREaderProcessor],
})
export class FileReaderModule { }