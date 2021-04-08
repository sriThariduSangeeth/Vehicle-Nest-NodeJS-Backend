import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { FileReaderModule } from './file-reader/file-reader.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      }
    }),
    FileReaderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
