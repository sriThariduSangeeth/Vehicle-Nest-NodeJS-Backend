import { Logger } from '@nestjs/common';
// import { gql } from 'apollo-server-express';
import gql from 'graphql-tag';
import ApolloClient from "apollo-boost";
import 'cross-fetch/polyfill';


const GET_VEHCLE = gql`
  query {
    allVData{
        nodes{
          firstName
          lastName
          email
          carMake
        }
    }
  }
  `;

const VEHICLE = gql`
mutation createPost($input: CreateVDatumInput!) {
  createVDatum(input: $input) {
    vDatum {
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

  client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
  });


  async getVehicle() {
    try {
      this.client.query({
        query: GET_VEHCLE,
      })
        .then(data => {
          return data.data.allVData;
        })
        .catch(error => this.logger.error(error));
    } catch (error) {
      this.logger.error(error);
    }

  }

  async createNewVehicle(firstName: string, lastName: string, email: string, carMake: string, carModel: string, vinNumber: string, manufacturedDate: string) {
    this.client.mutate({
      mutation: CREATE_VEHICLE,
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        carMake: carMake,
        carModel: carModel,
        vinNumber: vinNumber,
        manufacturedDate: manufacturedDate
      }
    })
      .then(data => console.log(data))
      .catch(error => console.error(error));

  }
}


