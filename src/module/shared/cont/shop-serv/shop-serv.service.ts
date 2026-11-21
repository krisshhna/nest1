import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShopServ } from './shop-serv.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class ShopServService {
    constructor(@InjectModel(ShopServ.name) public _shopServ:Model<ShopServ>){}

    async create(rec:any){
        let add = await this._shopServ.create(rec);
        return add._id;
    }

    async findAll(){
        return await this._shopServ.find().sort({_id:-1}).exec();
    }

    async findOne(_id:string){
        return await this._shopServ.findOne({_id:_id}).exec();
    }

    async updateOne(_id:string, rec:any){
        let id = await this._shopServ.updateOne({_id:_id}, rec);
        return id;
    }

    async deleteOne(_id:string){
        return await this._shopServ.deleteOne({_id:_id});
    }
}
