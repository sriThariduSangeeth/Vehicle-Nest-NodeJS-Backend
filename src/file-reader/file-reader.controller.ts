import { Controller, Get, Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileReaderGraphQLAPI } from './file-reader.api';
import { FileReaderService } from './file-reader.service';

@Controller('file')
export class FileReaderController {
    private readonly logger = new Logger(this.constructor.name);

    constructor(private readonly fileReaderService: FileReaderService,
        private readonly fileReaderApi: FileReaderGraphQLAPI) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('uploadcsv'))
    uploadFile(@UploadedFile() file: Express.Multer.File): string {
        this.logger.log(`upload CSV endpoint hit ${file.originalname}`);
        this.fileReaderService.FileReader(file);
        return 'ok';
    }

    @Get('test')
    testMethod() {
        console.log("hit test method");
        // this.fileReaderApi.createNewVehicle();
        return "";
    }
}
