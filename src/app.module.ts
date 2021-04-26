import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FileReaderModule } from './file-reader/file-reader.module';

@Module({
  imports: [FileReaderModule]
})
export class AppModule { }
