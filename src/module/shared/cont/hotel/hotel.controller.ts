import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { HotelService } from './hotel.service.js';

@Controller('hotel')
export class HotelController {
    constructor(public hotel:HotelService){}

    @Post()
    create(@Body() rec:any){
        return this.hotel.create(rec).then((data)=>({
            result:data,
        })).catch((err)=>({
            message:`Error message ${err}`
        }))
    }

    @Get(':page')
    findAll(@Param('page') page:number, @Query() query:any){
        return this.hotel.findAll(page, query).then((data)=>({
            result:data.result,
        })).catch((err)=>({
            message:`Error message asd ${err}`
        }))
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.hotel.findOne(id).then((data)=>({
            result:data,
        })).catch((err)=>({
            message:`Error message ${err}`
        }))
    }

    @Post(':id')
    updateOne(@Param('id') id:string, @Body() rec:any){
        let record = {id, rec};
        return this.hotel.updateOne(record).then((data)=>({
            result:data,
        })).catch((err)=>({
            message:`Error message ${err}`
        }))
    }

    @Delete(':id')
    deleteOne(@Param('id') id:string){
        return this.hotel.deleteOne(id).then((data)=>({
            result:data,
        })).catch((err)=>({
            message:`Error message ${err}`
        }))
    }
}
