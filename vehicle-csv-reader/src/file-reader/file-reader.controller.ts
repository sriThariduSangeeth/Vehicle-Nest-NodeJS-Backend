import { Controller, Get, Logger, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileReaderProducerService } from './file-reader.producer.service';

@Controller('file')
export class FileReaderController {

    private readonly logger = new Logger(this.constructor.name);

    constructor(private readonly fileReaderService: FileReaderProducerService) { }

    @Get('message')
    getHello(@Query('msg') msg: string): string {
        this.fileReaderService.sendMessage(msg);
        return msg;
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('uploadcsv'))
    uploadFile(@UploadedFile() file: Express.Multer.File): string {
        this.logger.log(`upload CSV endpoint hit ${file.originalname}`);
        this.fileReaderService.FileReader(file);
        return '';
    }

}
