import { Column, Model, Table } from "sequelize-typescript";

@Table({tableName: 'Vehicle'})
export class Vehicle extends Model<Vehicle>{

    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column
    firstName: string;

    @Column
    last_name: string;

    @Column
    email: string;

    @Column
    car_make: string;

    @Column
    car_model: string;

    @Column
    vin_number: string;

    @Column
    manufactured_date: string;
}