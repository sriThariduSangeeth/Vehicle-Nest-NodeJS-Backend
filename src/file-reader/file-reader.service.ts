import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class FileReaderService {

    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectQueue('fileQueue')
        private csvQueue: Queue,
    ) { }

    // add to the queue name : fileQueue 
    async FileReader(file: Express.Multer.File) {
        this.logger.log('message inster into queue.');
        await this.csvQueue.add('csv-job', {
            obj: file
        })
    }

}
