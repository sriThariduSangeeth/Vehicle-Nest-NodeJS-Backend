
import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class FileReaderService {

    private readonly logger = new Logger(this.constructor.name)

    // constructor(
    //     @InjectQueue('fileQueue')
    //     private mailQueue: Queue,
    //   ) {}
    
    getHello(): string {
    return 'Hello World!';
    }
}