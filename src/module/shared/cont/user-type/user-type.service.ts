import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userType } from './user-type.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class UserTypeService {
    constructor(@InjectModel(userType.name) public _userType:Model<userType>){}

    async addType(rec:any){
        let add = await this._userType.create(rec);
        return add._id;
    }

    async allList(){
        return await this._userType.find().sort({_id:-1}).exec();
    }

    async findOne(_id:string){
        return await this._userType.findOne({_id:_id}).exec();
    }

    async updateList(rec:any){
        return await this._userType.updateOne({_id:rec._id},rec);
    }

    async deleteRec(_id:string){
        return await this._userType.deleteOne({_id:_id});
    }
}
