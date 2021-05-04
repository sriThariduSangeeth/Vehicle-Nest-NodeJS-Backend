import { Controller, Get, Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FileReaderGraphQLAPI } from './file-reader.api';
import { FileReaderService } from './file-reader.service';

@Controller('file')
export class FileReaderController {

    private readonly logger = new Logger(this.constructor.name);

    constructor(private readonly fileReaderService: FileReaderService,
        private readonly fileReaderApi: FileReaderGraphQLAPI,
        private config: ConfigService) { }


    /**
     * 
     * @param file CVS Files
     * @returns String response
     */
    @Post('upload')
    @UseInterceptors(FileInterceptor('uploadcsv'))
    uploadFile(@UploadedFile() file: Express.Multer.File): Promise<void> {
        this.logger.log(`upload CSV endpoint hit ${file.originalname}`);
        return this.fileReaderService.FileReader(file);
    }

    /**
     * @todo this API for run test case
     * @returns 
     */
    @Get('test')
    testMethod() {
        console.log("hit test method");
        return "this.fileReaderApi.getVehicles()";
    }
}
