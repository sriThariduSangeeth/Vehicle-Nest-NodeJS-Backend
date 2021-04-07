import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileReaderService } from './file-reader.service';

@Controller('file')
export class FileReaderController {
    constructor(private readonly fileReaderService: FileReaderService) { }

    @Get()
    getHello(): string {
        return this.fileReaderService.getHello();
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File):string {

        console.log(file);

      return '';
    }
    
}
