import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HotelService {
    constructor(@Inject('HOTEL_SERVICE') public hotel:ClientProxy){}

    async create(rec:any){
        return await firstValueFrom(this.hotel.send('createHotel',rec)); 
    }

    async findAll(page:number, query:any){
        let rec = {page, query};
        return await firstValueFrom(this.hotel.send('allHotel',rec)); 
    }

    async findOne(id:string){
        return await firstValueFrom(this.hotel.send('singleHotel',id)); 
    }

    async updateOne(rec:any){
        return await firstValueFrom(this.hotel.send('updateHotel',rec)); 
    }

    async deleteOne(id:string){
        return await firstValueFrom(this.hotel.send('removeHotel',id)); 
    }
}
