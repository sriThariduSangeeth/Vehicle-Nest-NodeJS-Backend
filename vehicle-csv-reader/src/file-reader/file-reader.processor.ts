import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import * as fs from "fs";
import * as csv from "csv-parser";
import { FileReaderGraphQLAPI } from "./file-reader.api";
import { WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { FileReaderService } from "./file-reader.service";

@Processor('fileQueue')
export class FileREaderProcessor {

    @WebSocketServer()
    private server: Server;

    private readonly logger = new Logger(this.constructor.name)
    constructor(private fileReaderGraphQLAPI: FileReaderGraphQLAPI,
        private fileservice: FileReaderService) { }

    @OnQueueActive()
    onActive(job: Job) {
        console.log('active statu')
        this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
    }

    @OnQueueCompleted()
    onComplete(job: Job, result: any) {
        this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`);
        this.fileservice.fileUploadComplete(`Completed job ${job.id} of type ${job.name}.`);
    }

    @OnQueueFailed()
    onError(job: Job<any>, error: any) {
        this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    }


    /**
     * @type Redis Job
     * @param job Consume csv-job queue and push data into postgraphile line by line
     */
    @Process('csv-job')
    OnProcess(job: Job<any>) {
        this.logger.log(`concum job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
        this.logger.log('File read by consumer.');
        try {
            let progress = 0;
            fs.createReadStream(job.data.obj.path)
                .pipe(csv())
                .on('data', (data) => {
                    this.fileReaderGraphQLAPI.createNewVehicle(data.first_name, data.last_name, data.email, data.car_make,
                        data.car_model, data.vin_number, data.manufactured_date);
                    job.progress(progress++);
                }).on('end', end => {
                    this.fileservice.fileUploadComplete("Queue Process completed.");
                });
        } catch (error) {
            this.logger.error(error);
        }
    }
}