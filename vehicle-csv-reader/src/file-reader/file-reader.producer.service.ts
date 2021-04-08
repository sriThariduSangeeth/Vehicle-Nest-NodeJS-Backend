
import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';


@Injectable()
export class FileReaderProducerService {

    private readonly logger = new Logger(this.constructor.name)

    constructor(
        @InjectQueue('fileQueue')
        private csvQueue: Queue,
    ) { }

    async sendMessage(msg: string) {
        await this.csvQueue.add('csv-job', {
            text: msg
        });
    }
}