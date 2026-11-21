import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Location } from './location.schema.js';
import { type Connection, Model } from 'mongoose';

@Injectable()
export class LocationService {
    constructor(@InjectModel(Location.name) public _location:Model<Location>, @InjectConnection() public connection:Connection){}

    async addOne(rec:any){
        let add:any = await this._location.create(rec);
        return add.cities[0];
    }

    async allList(){
        let list = await this.connection.collection('hotels').aggregate([{$group:{_id:'$location'}}]).toArray();
        let loca = await this._location.aggregate([{$unwind:'$cities'},{$project:{_id:'$cities._id', name:'$cities.name'}},{$sort:{name:1}}]).exec();
        let result= list.map(item=>{
            let matched = loca.find(re=>re._id.toString() == item._id.toString());
            if(matched){
                return {_id:item._id, name:matched.name};
            }
        }).filter(Boolean);
        return result;
    }

    async findOne(_id:string){
        return await this._location.findOne({_id:_id}).exec();
    }

    async updteOne(_id:string, rec:any){
        return await this._location.updateOne({_id:_id}, rec);
    }

    async deleteOne(_id:string){
        return await this._location.deleteOne({_id:_id});
    }
}
