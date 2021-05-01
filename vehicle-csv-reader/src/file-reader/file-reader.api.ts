import { Logger } from '@nestjs/common';
// import { gql } from 'apollo-server-express';
import gql from 'graphql-tag';
import ApolloClient, { Observable } from "apollo-boost";
import 'cross-fetch/polyfill';
import { Vehicle } from 'src/model/vehicle';
import { ConfigService } from '@nestjs/config';
import { UpdateVehicleInput } from 'src/dto/input/update-vehicle.input';


const GET_ALL_VEHCLE = gql`
  query {
    allVData{
        nodes{
          id
          firstName
          lastName
          email
          carMake
          carModel
          vinNumber
          manufacturedDate
        }
    }
  }
  `;

const GET_VEHICLE_BY_ID = gql`
  query($id: Int!){
    vDatumById(id: $id){
      id
      firstName
      lastName
      email
      carMake
      carModel
      vinNumber
      manufacturedDate
    }
  }
  `;

const UPDATE_VEHICLE_ID = gql`
  mutation($id : UpdateVDatumByIdInput!){
    updateVDatumById(input:$id){
      vDatum{
        id
        firstName
        lastName
        email
        carMake
        carModel
        vinNumber
        manufacturedDate
      }
    }
  }
  `;

const DELETE_VEHICLE_BY_ID = gql`
  mutation($id : DeleteVDatumByIdInput!){
    deleteVDatumById(input:$id){
      vDatum{
        id
        firstName
        lastName
        email
        carMake
        carModel
        vinNumber
        manufacturedDate
      }
    }
  }
  `;

const CREATE_VEHICLE = gql`
mutation(
	$firstName: String!
	$lastName: String!
	$email: String!
	$carMake: String!
	$carModel: String!
	$vinNumber: String!
	$manufacturedDate: Date!
){
  createVDatum(
    input:{
    vDatum:{
			firstName: $firstName
			lastName: $lastName
			email: $email
			carMake: $carMake
			carModel: $carModel
			vinNumber: $vinNumber
			manufacturedDate: $manufacturedDate
      
    }
    }){
      vDatum {
      id
      firstName
      lastName
      email
      carMake
      carModel
      vinNumber
      manufacturedDate
    }
  }
}
`;

export class FileReaderGraphQLAPI {

  private readonly logger = new Logger(this.constructor.name);

  constructor(private config: ConfigService) { }

  //db_url = this.config.get('POSTGRAPHILE');

  client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
  });

  async getAllVehicles(): Promise<Vehicle[]> {

    const response = await this.client.query({
      query: GET_ALL_VEHCLE,
    }).then(data => {
      console.log(data.data.allVData.nodes);

      return data.data.allVData.nodes;
    }).catch(error => {
      this.logger.error(error);
      const resVe: Vehicle[] = [];
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

    const response = this.client.mutate({
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


