import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { FileReaderProducerService } from "./file-reader.producer.service";

@Processor('fileQueue')
export class FileREaderProcessor {

    private readonly logger = new Logger(this.constructor.name)
    constructor(private readonly fileReaderService: FileReaderProducerService) { }

    @OnQueueActive()
    onActive(job: Job) {
        console.log('active statu')
        this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`)
    }

    // @OnQueueCompleted()
    // onComplete(job: Job, result: any) {
    //     this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`)
    // }

    // @OnQueueFailed()
    // onError(job: Job<any>, error: any) {
    //     this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack)
    // }

    @Process('csv-job')
    OnProcess(job: Job<any>) {
        console.log('proces statu')
        console.log(job.data);
    }

}