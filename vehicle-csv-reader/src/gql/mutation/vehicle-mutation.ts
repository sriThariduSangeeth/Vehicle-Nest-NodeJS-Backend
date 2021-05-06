import { Logger } from '@nestjs/common';
import gql from 'graphql-tag';


export const UPDATE_VEHICLE_ID = gql`
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

export const DELETE_VEHICLE_BY_ID = gql`
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

export const CREATE_VEHICLE = gql`
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

export class VehicleMutation {

}