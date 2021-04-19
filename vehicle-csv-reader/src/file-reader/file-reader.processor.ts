import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import * as fs from "fs";
import * as csv from "csv-parser";


@Processor('fileQueue')
export class FileREaderProcessor {

    private readonly logger = new Logger(this.constructor.name)
    constructor() { }

    @OnQueueActive()
    onActive(job: Job) {
        console.log('active statu')
        this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
    }

    @OnQueueCompleted()
    onComplete(job: Job, result: any) {
        this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`);
    }

    @OnQueueFailed()
    onError(job: Job<any>, error: any) {
        this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    }

    // consume created job
    @Process('csv-job')
    OnProcess(job: Job<any>) {
        this.logger.debug(`concum job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);

        const vehicle = [];

        this.logger.log('File read by consumer.');
        fs.createReadStream(job.data.obj.path)
            .pipe(csv())
            .on('data', (data) => vehicle.push(data))
            .on('end', () => {
                console.log(vehicle);
                // [
                //   { NAME: 'Daffy Duck', AGE: '24' },
                //   { NAME: 'Bugs Bunny', AGE: '22' }
                // ]
            });
    }

}