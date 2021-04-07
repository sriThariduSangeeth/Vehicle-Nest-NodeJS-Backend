import { Sequelize } from 'sequelize-typescript';
import { Vehicle } from 'src/vehicle/entity/vehicle.entity';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'vehicle',
      });
      sequelize.addModels([Vehicle]);
      await sequelize.connectionManager;
      return sequelize;
    },
  },
];