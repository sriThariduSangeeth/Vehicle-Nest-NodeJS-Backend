import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { FileReaderGraphQLAPI } from './services/file-reader.api';


@Module({
  imports: [
    BullModule.registerQueue({
      name: 'fileQueue'
    }),
    MulterModule.register({
      dest: './uploaddata',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [FileReaderGraphQLAPI],
})
export class AppModule { }
