import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserFactory } from './user.schema.js';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:User.name, schema:UserFactory}
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
