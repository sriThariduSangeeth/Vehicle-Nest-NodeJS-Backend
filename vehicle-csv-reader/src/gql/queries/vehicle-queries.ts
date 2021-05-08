import { Logger } from '@nestjs/common';
import gql from 'graphql-tag';

export const GET_ALL_VEHCLE_COUNT = gql`
    query{
        allVData{
            totalCount
        }
    } 
`;

export const GET_ALL_VEHCLE = gql`
  query (
      $first:Int,
      $offset:Int,
      $last:Int
  ){
    allVData(
      first:$first, 
      offset:$offset,
      last:$last,
    ){
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
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