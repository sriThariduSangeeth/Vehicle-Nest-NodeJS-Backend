import { Logger } from '@nestjs/common';
import gql from 'graphql-tag';

export const GET_ALL_VEHCLE = gql`
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

export const GET_VEHICLE_BY_ID = gql`
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

export class VehicleQueries {

}