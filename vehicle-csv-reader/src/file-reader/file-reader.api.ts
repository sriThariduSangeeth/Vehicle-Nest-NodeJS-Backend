import { Logger } from '@nestjs/common';
// import { gql } from 'apollo-server-express';
import gql from 'graphql-tag';
import ApolloClient, { DefaultOptions, InMemoryCache, Observable } from "apollo-boost";
import 'cross-fetch/polyfill';
import { Vehicle } from 'src/model/vehicle';
import { ConfigService } from '@nestjs/config';
import { UpdateVehicleInput } from 'src/dto/input/update-vehicle.input';
import { GET_ALL_VEHCLE, GET_ALL_VEHCLE_COUNT, GET_VEHICLE_BY_ID } from 'src/gql/queries/vehicle-queries';
import { CREATE_VEHICLE, DELETE_VEHICLE_BY_ID, UPDATE_VEHICLE_ID } from 'src/gql/mutation/vehicle-mutation';
import { Count } from 'src/model/count';
import { PaginateArgs } from 'src/dto/args/paginate.args';
import { PaginateVehicle } from 'src/model/paginate-vehicle';

export class FileReaderGraphQLAPI {

  private readonly logger = new Logger(this.constructor.name);

  client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:5000/graphql',
  });

  db_url: string;

  constructor(private config: ConfigService) {

    // this.db_url = this.config.get('POSTGRAPHILE');
    // console.log(this.db_url);


    this.client.defaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }
  }



  async getTotalVehicleCount(): Promise<Count> {

    const response = await this.client.query({
      query: GET_ALL_VEHCLE_COUNT
    }).then(data => {
      return data.data.allVData;
    }).catch(error => {
      this.logger.error(error);
      return 0;
    });

    return response;
  }



  async getAllVehicles(painate: PaginateArgs): Promise<PaginateVehicle> {

    const response = await this.client.query({
      query: GET_ALL_VEHCLE,
      variables: painate
    }).then(data => {
      const res: PaginateVehicle = {
        totalCount: data.data.allVData.totalCount,
        vehicles: data.data.allVData.nodes
      };
      return res;
    }).catch(error => {
      this.logger.error(error);
      const resVe: PaginateVehicle = {
        totalCount: 0,
        vehicles: []
      };
      return resVe;
    });
    return response;
  }

  async getVehicleById(id: number): Promise<Vehicle> {
    const resVe: Vehicle = new Vehicle();
    const response = await this.client.query({
      query: GET_VEHICLE_BY_ID,
      variables: {
        id: id
      }
    }).then(data => {
      if (data.data.vDatumById != null) {
        return data.data.vDatumById;
      }
      return resVe;

    }).catch(error => {
      this.logger.error(error);
      return resVe;
    });
    return response;
  }

  async getVehicleByVId(): Promise<Vehicle> {
    //TODO
    return
  }

  async updateVehicleById(updateVehicle: UpdateVehicleInput): Promise<Vehicle> {
    const response = this.client.mutate({
      mutation: UPDATE_VEHICLE_ID,
      variables: {
        id: {
          id: updateVehicle.id,
          vDatumPatch: {
            firstName: updateVehicle.firstName,
            lastName: updateVehicle.lastName,
            email: updateVehicle.email,
            carMake: updateVehicle.carMake,
            carModel: updateVehicle.carModel,
            vinNumber: updateVehicle.vinNumber,
            manufacturedDate: updateVehicle.manufacturedDate
          }
        }
      }
    }).then(data => {
      return data.data.updateVDatumById.vDatum;
    }).catch(error => {
      this.logger.error(error);
      const resVe: Vehicle = new Vehicle();
      return resVe;
    });
    return response;
  }

  async deleteVehicleById(vid: number): Promise<Vehicle> {
    const response = this.client.mutate({
      mutation: DELETE_VEHICLE_BY_ID,
      variables: {
        id: {
          id: vid
        }
      }
    }).then(data => {
      return data.data.deleteVDatumById.vDatum;
    }).catch(error => {
      this.logger.error(error);
      const resVe: Vehicle = new Vehicle();
      return resVe;
    });
    return response;
  }

  async createNewVehicle(firstName: string, lastName: string, email: string, carMake: string, carModel: string, vinNumber: string, manufacturedDate: string) {

    const response = await this.client.mutate({
      mutation: CREATE_VEHICLE,
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        carMake: carMake,
        carModel: carModel,
        vinNumber: vinNumber,
        manufacturedDate: manufacturedDate
      },
    })
      .then(data => {
        return data.data.createVDatum.vDatum;
      })
      .catch(error => {
        this.logger.error(error);
        const resVe: Vehicle = new Vehicle();
        return resVe;
      });

    return response;
  }
}


