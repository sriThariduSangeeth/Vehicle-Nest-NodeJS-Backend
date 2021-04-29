import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { GetVehicleByIdArgs } from 'src/dto/args/get-vehicleById.args';
import { CreateVehicleInput } from 'src/dto/input/create-vehicle.input';
import { DeleteVehicleInput } from 'src/dto/input/delete-vehicle.input';
import { UpdateVehicleInput } from 'src/dto/input/update-vehicle.input';
import { Vehicle } from '../model/vehicle';
import { FileReaderGraphQLAPI } from './file-reader.api';

@Injectable()
export class FileReaderService {

    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectQueue('fileQueue')
        private csvQueue: Queue,
        private readerApi: FileReaderGraphQLAPI,
    ) { }

    // add to the queue name : fileQueue 
    async FileReader(file: Express.Multer.File) {
        this.logger.log('message inster into queue.');
        await this.csvQueue.add('csv-job', {
            obj: file
        })
    }

    public getVehicle(getVehicle: GetVehicleByIdArgs): Promise<Vehicle> {
        if (getVehicle.vehicleId != null) {
            return this.readerApi.getVehicleById(getVehicle.vehicleId);
        }
        return this.readerApi.getVehicleByVId();
    }

    public getAllVehicles(): Promise<Vehicle[]> {
        return this.readerApi.getAllVehicles();
    }

    public cretaeVehicle(createVehicle: CreateVehicleInput): Promise<Vehicle> {
        return this.readerApi.createNewVehicle(createVehicle.firstName, createVehicle.lastName,
            createVehicle.email, createVehicle.carMake, createVehicle.carModel, createVehicle.vinNumber, createVehicle.manufacturedDate);
    }

    public updateVehicle(updateVehicle: UpdateVehicleInput): Promise<Vehicle> {
        return this.readerApi.updateVehicleById(updateVehicle);
    }

    public deleteVehicle(deleteVehicle: DeleteVehicleInput): Promise<Vehicle> {
        return
    }

}
