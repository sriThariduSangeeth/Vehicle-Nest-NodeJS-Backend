import { Injectable } from '@nestjs/common';

@Injectable()
export class FileReaderService {
    getHello(): string {
        return 'Hello World!';
    }
}
