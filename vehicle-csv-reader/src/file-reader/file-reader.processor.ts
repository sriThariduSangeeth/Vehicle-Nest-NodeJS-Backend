import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { FileReaderService } from "./file-reader.service";

@Processor()
export class FileREaderProcessor{
    
    private readonly logger = new Logger(this.constructor.name)
    constructor(private readonly fileReaderService: FileReaderService){}

    // @OnQueueActive()
    // onActive(job: Job) {
    //     this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`)
    // }

    // @OnQueueCompleted()
    // onComplete(job: Job, result: any) {
    //     this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`)
    // }

    // @OnQueueFailed()
    // onError(job: Job<any>, error: any) {
    //     this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack)
    // }

    // @Process('')
    // async OnProcess(){

    // }

}