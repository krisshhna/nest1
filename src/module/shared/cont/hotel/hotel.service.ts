import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { firstValueFrom } from 'rxjs';
import { Hotel } from './hotel.schema.js';
import { Model } from 'mongoose';
import { Location } from '../location/location.schema.js';


@Injectable()
export class HotelService {
    constructor(@InjectModel(Hotel.name) public _hotel:Model<Hotel>, @InjectModel(Location.name) public _loc:Model<Location>){}

    async create(rec:any){
        let add = await this._hotel.create(rec);
        return add._id;
    }

    async read(rec:any, page:number){
        let filter:any = {};
        if(rec !== undefined && rec !== null && String(rec).trim() !== ''){
            const search = String(rec).trim();
            filter.$or = [
                    {name:{$regex:search, $options:'i'}},
                    {status:{$regex:search, $options:'i'}},
                    {location:{$regex:search, $options:'i'}}
                ]
        }
        return await this._hotel.find(filter).exec();
    }

    async singleOne(_id:any){
        return await this._hotel.findOne(_id).exec();
    }

    async updateOne(_id:any, rec:any){
        return await this._hotel.updateOne(_id, rec);
    }

    async deleteOne(_id:any){
        return await this._hotel.deleteOne(_id);
    }

    // async findAll(page:number, query:any){
    //     let rec = {page, query};
    //     return await firstValueFrom(this.hotel.send('allHotel',rec)); 
    // }


    // async deleteOne(id:string){
    //     return await firstValueFrom(this.hotel.send('removeHotel',id)); 
    // }
}
