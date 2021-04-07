import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      playground: false,
      autoSchemaFile: true,
    }),
    VehicleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
