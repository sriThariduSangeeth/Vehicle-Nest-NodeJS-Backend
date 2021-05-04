import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FileReaderModule } from './file-reader/file-reader.module';

@Module({
  imports: [FileReaderModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppModule { }
