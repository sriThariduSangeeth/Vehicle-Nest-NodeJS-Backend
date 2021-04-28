import { gql } from "apollo-server-express";



export class QueryVehicle {

    static GET_VEHCLE(GET_VEHCLE: any) {
        throw new Error('Method not implemented.');
    }

    GET_VEHCLE = gql`
  query {
    allVData{
        nodes{
          firstName
        }
    }
  }
`;

}