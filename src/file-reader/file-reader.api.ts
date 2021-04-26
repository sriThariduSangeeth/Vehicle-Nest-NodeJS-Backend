import { GraphQLDataSource } from 'apollo-datasource-graphql';
import { gql } from 'apollo-server-express';

const CRAFT_BEERS = gql`
  query {
    allVData{
        nodes{
          firstName
        }
    }
  }
`;
export class FileReaderGraphQLAPI extends GraphQLDataSource {
  baseURL = 'http://localhost:5000/graphql';

  query = super.query;

  async getCraftBeers() {
    try {

      const response = await this.query(CRAFT_BEERS);

      console.log(response);
      return response.data.allVData.nodes;
    } catch (error) {
      console.error(error);
    }
  }
}