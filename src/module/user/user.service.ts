import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) public _user:Model<User>){}

  async create(rec: any) {
    let add = await this._user.create(rec); 
    return add._id;
  }

  async findAll() {
    return await this._user.find().exec();
  }

  async findOne(id: string) {
    return await this._user.findOne({_id:id}).exec();
  }

  async update(id: string, rec:any) {
    return await this._user.updateOne({_id:id}, rec);
  }

  async remove(id: string) {
    return await this._user.deleteOne({_id:id});
  }

  async checkEmail(email:string){
    return await this._user.findOne({email:email}).exec();
  }
}
