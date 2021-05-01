<h3 align="center">:rotating_light: :construction:&ensp;&ensp;Work In Progress&ensp;&ensp;:construction: :rotating_light:</h3>
<h1 align="center">Vehicle CSV Reader</h1>
<h3 align="center">Back-end Service</h1>

<p align="center">
  <img src="https://nodejs.org/static/images/logo.svg" alt="Node" height="35">
  <img src="https://nestjs.com/img/logo_text.svg" alt="jet" height="35">
  <img src="https://cdn.rawgit.com/graphile/graphile.github.io/a6225f8c3052df5c276ecef28aeb0cade1aec16a/logos/postgraphile.optimized.svg" alt="jet" height="35">
  <img src="https://graphql.org/img/logo.svg" alt="jet" height="35">
   <img src="https://redis.io/images/redis-white.png" alt="jet" height="35">
</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash

$ npm run start:dev

```

<p>This application works as a back end serices for <a href="https://github.com/sriThariduSangeeth/Vehicle-Angular-Frontend.git">Vehicle Angular Frontend</a>.All introdution about queries note down with this documentation. </p>

<h2>Content&ensp;&ensp;:book: :book:</h2>
<ul>
    <li> - [x] File upload (.CSV)</li>
    <li> - [x] All CRUD operation</li>
     <li> - [ ] Notification using WebSocket</li>
    <li> - [x] Redis and Bull Queue</li>
</ul>

### Upload file API
```bash
#form-data key: uploadcsv
http://localhost:<Port>/file/upload
```
### Object type
```bash
  type Vehicle {
  id: Int!
  firstName: String!
  lastName: String!
  email: String!
  carMake: String!
  carModel: String!
  vinNumber: String!
  manufacturedDate: String!
  }
```

### Sample Queris 
```bash
query{
  vehicles{
    id
    firstName
    lastName
    manufacturedDate
  }
}
```

### Sample Mutation 
> Create Vehicle
  ```bash
  mutation{
    createVehicle(createVehicleData:{
        firstName:$firstName,
        lastName:$lastName,
        email:$email,
        carModel:$carMake,
        carMake:$carModel,
        vinNumber:$vinNumber,
        manufacturedDate:$manufacturedDate
    }){
      id
      firstName
      lastName
      manufacturedDate
    }
  }
  ```

> Update Vehicle
  ```bash
  mutation{
      updateVehicle(updateVehicleData:{
          id:$id
          firstName:$firstName,
          lastName:$lastName,
          email:$email,
          carModel:$carMake,
          carMake:$carModel,
          vinNumber:$vinNumber,
          manufacturedDate:$manufacturedDate
      }){
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
  ```

> Update Vehicle
  ```bash
  mutation{
    deleteVehicle(deleteVehicle:{vehicleId:$id}){
      firstName
      lastName
      manufacturedDate
    }
  }
  ```
