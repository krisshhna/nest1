import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { HotelService } from './hotel.service.js';
import { catchError } from 'rxjs';

@Controller('hotel')
export class HotelController {
    constructor(public hotel:HotelService){}

    @Post()
    create(@Body() rec:any){
        return this.hotel.create(rec).then((data)=>({
            result:data,
            message:'Record created successfull!'
        })).catch((err)=>({
            message:`ERROR MESSAGE: ${err}`
        }));
    }

    @Get('/:page')
    readRecord(@Param('page') page:number, @Query('search') search:string){
        console.log(page, search);
        return this.hotel.read(search, page).then((data)=>({
            result:data,
            message:'All Records'
        })).catch((err)=>({
            message:`ERROR MESSAGE: ${err}`
        }));
    }

    @Get('/:id')
    findOne(@Param('id') _id:string){
        return this.hotel.singleOne({_id}).then((data)=>({
            result:data
        })).catch((err)=>({
            message:`ERROR MESSAGE: ${err}`
        }));
    }

    @Post('/:id')
    updateOne(@Param('id') _id:string, @Body() rec:any){
        return this.hotel.updateOne({_id},rec).then((data)=>({
            result:data, 
            message:'Single record updated successfully!'
        })).catch((err)=>({
            message:`ERROR MESSAGE ${err}`
        }));
    }

    @Delete('/:id')
    deleteOne(@Param('id') _id:string){
        return this.hotel.deleteOne({_id}).then((data)=>({
            result:data,
            message:'Deleted successfull!!'
        })).catch((err)=>({
            message:`ERROR MESSAGE: ${err}`
        }));
    }
}
