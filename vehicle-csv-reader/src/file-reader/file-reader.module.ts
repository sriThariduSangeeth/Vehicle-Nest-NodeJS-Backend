import { Module } from '@nestjs/common';
import { FileReaderController } from './file-reader.controller';
import { FileReaderService } from './file-reader.service';


@Module({
  imports: [
    //   BullModule.registerQueue({
    //       name: 'fileQueue'
    //   }),
    //   MulterModule.register({
    //       dest: '../data'
    //   })
  ],
  controllers: [ FileReaderController],
  providers: [ FileReaderService ],
})
export class FileReaderModule {}