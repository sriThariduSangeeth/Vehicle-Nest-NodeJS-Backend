import { Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileReaderProducerService } from './file-reader.producer.service';

@Controller('file')
export class FileReaderController {
    constructor(private readonly fileReaderService: FileReaderProducerService) { }

    @Get('message')
    getHello(@Query('msg') msg: string): string {
        this.fileReaderService.sendMessage(msg);
        return msg;
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File): string {

        console.log(file);

        return '';
    }

}
