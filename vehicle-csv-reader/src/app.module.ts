import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FileReaderModule } from './file-reader/file-reader.module';
import { FileReaderSocketGateway } from './web-socket/file-reader-socket.gateway';

@Module({
  imports: [FileReaderModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  providers: [FileReaderSocketGateway],
})
export class AppModule { }
