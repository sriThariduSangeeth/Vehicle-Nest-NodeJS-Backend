import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { GetVehicleByIdArgs } from 'src/dto/args/get-vehicleById.args';
import { PaginateArgs } from 'src/dto/args/paginate.args';
import { CreateVehicleInput } from 'src/dto/input/create-vehicle.input';
import { DeleteVehicleInput } from 'src/dto/input/delete-vehicle.input';
import { UpdateVehicleInput } from 'src/dto/input/update-vehicle.input';
import { Count } from 'src/model/count';
import { PaginateVehicle } from 'src/model/paginate-vehicle';
import { FileReaderSocketGateway } from 'src/web-socket/file-reader-socket.gateway';
import { Vehicle } from '../model/vehicle';
import { FileReaderGraphQLAPI } from './file-reader.api';

@Injectable()
export class FileReaderService {

    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectQueue('fileQueue')
        private csvQueue: Queue,
        private readerApi: FileReaderGraphQLAPI,
        private readonly websocketGateway: FileReaderSocketGateway
    ) { }

    // add to the queue name : fileQueue 
    async FileReader(file: Express.Multer.File) {
        this.logger.log('message inster into queue.');
        const job = await this.csvQueue.add('csv-job', {
            obj: file
        }, { delay: 4000 }
        ).then(data => {
            this.logger.log("queue added complete");
            return data;

        }).catch(error => {
            this.logger.error("queue added incomplete");
            return error;
        });
        return job;
    }

    public getVehicle(getVehicle: GetVehicleByIdArgs): Promise<Vehicle> {
        if (getVehicle.vehicleId != null) {
            return this.readerApi.getVehicleById(getVehicle.vehicleId);
        }
        return this.readerApi.getVehicleByVId();
    }

    public getAllVehicleCount(): Promise<Count> {
        return this.readerApi.getTotalVehicleCount();
    }

    public getAllVehicles(painate: PaginateArgs): Promise<PaginateVehicle> {
        return this.readerApi.getAllVehicles(painate);
    }

    public cretaeVehicle(createVehicle: CreateVehicleInput): Promise<Vehicle> {
        return this.readerApi.createNewVehicle(createVehicle.firstName, createVehicle.lastName,
            createVehicle.email, createVehicle.carMake, createVehicle.carModel, createVehicle.vinNumber, createVehicle.manufacturedDate);
    }

    public updateVehicle(updateVehicle: UpdateVehicleInput): Promise<Vehicle> {
        return this.readerApi.updateVehicleById(updateVehicle);
    }

    public deleteVehicle(deleteVehicle: DeleteVehicleInput): Promise<Vehicle> {
        return this.readerApi.deleteVehicleById(deleteVehicle.vehicleId);
    }

    public fileUploadComplete(mess: string) {
        return this.websocketGateway.handleMessage(mess);
    }

    async getAllVehiclesById(count: number): Promise<Vehicle[]> {
        this.logger.log('age inster into queue.');
        const job = await this.csvQueue.add('vehicle-age', {
            count: count
        }, { delay: 4000 }
        ).then(data => {
            this.logger.log("queue added complete");
            return data;

        }).catch(error => {
            this.logger.error("queue added incomplete");
            return error;
        });
        return job;
    }

}
