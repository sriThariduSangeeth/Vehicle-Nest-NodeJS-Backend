import { Module } from '@nestjs/common';
import { FileReaderModule } from './file-reader/file-reader.module';

@Module({
  imports: [FileReaderModule],
})
export class AppModule { }
