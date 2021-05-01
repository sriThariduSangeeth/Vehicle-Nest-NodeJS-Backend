import { Injectable } from '@nestjs/common';
import { SignInData } from './models/signInData';

@Injectable()
export class AppService {
  getHello(): string {

    

    return 'Hello World!';
  }
}
