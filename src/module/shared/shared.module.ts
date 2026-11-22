import { Global, Module } from '@nestjs/common';
import { UserTypeController } from './cont/user-type/user-type.controller.js';
import { LocationController } from './cont/location/location.controller.js';
import { LocationService } from './cont/location/location.service.js';
import { UserTypeService } from './cont/user-type/user-type.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { userType, userTypeFactory } from './cont/user-type/user-type.schema.js';
import { Location, locationFactory } from './cont/location/location.schema.js';
import { JwtModule } from '@nestjs/jwt';
import { HotelController } from './cont/hotel/hotel.controller.js';
import { HotelService } from './cont/hotel/hotel.service.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ShopServController } from './cont/shop-serv/shop-serv.controller.js';
import { ShopServService } from './cont/shop-serv/shop-serv.service.js';
import { ShopServ, shopServFactory } from './cont/shop-serv/shop-serv.schema.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const protoPath = join(__dirname, 'cont', 'hotel', 'hotel.proto');

@Global()
@Module({
  imports:[
    MongooseModule.forFeature([
      {name:userType.name, schema:userTypeFactory},
      {name:Location.name, schema:locationFactory},
      {name:ShopServ.name, schema:shopServFactory}
    ]),
    JwtModule.register({
      secret:`${process.env.JWTSECRET}`,
      signOptions:{expiresIn:'1h'}
    }),
    ClientsModule.register([
    {
        name:'Hotel_CRUD',
        transport:Transport.GRPC,
        options:{
          package:'hotel',
          protoPath:join(__dirname, 'cont', 'hotel', 'hotel.proto'),
          url:'localhost:6321',
          loader: {
            keepCase: false,
            defaults: true,
            arrays: true,
            objects: true,
          },
        }
      }
    ])
  ],
  controllers: [UserTypeController, LocationController, HotelController, ShopServController],
  providers: [LocationService, UserTypeService, HotelService, ShopServService],
  exports:[LocationService, UserTypeService, JwtModule]
})
export class SharedModule {}