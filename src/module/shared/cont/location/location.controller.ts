import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LocationService } from './location.service.js';
import { Types, type Connection } from 'mongoose';

@Controller('location')
export class LocationController{
    constructor(public _locationService:LocationService){}

    @Post()
    create(@Body() body:any){
        return this._locationService.addOne(body).then((res)=>({
            result:res,
            message:'Single record added successfully!'
        })).catch((err)=>({
            message:`Issue in the api ${err}`
        }));
    }

    @Get()
    async readRecord(){
        return this._locationService.allList().then((res)=>({
            result: res,
            message:'Successfull'
        })).catch((err)=>({
            message:`Error message ${err}`
        }));
    }

    @Get('/:id')
    singleRecord(@Param('id') _id:string){
        return this._locationService.findOne(_id).then((res)=>({
            result: res,
            message:'Single record'
        })).catch((err)=>({
            message:`Error message ${err}`
        }));
    }

    @Post('updateRec')
    updateRecord(@Body() rec:any){
        return this._locationService.updteOne(rec._id, rec).then((res)=>({
            result: res,
            message:'Successfull'
        })).catch((err)=>({
            message:`Error message ${err}`
        }));
    }

    @Delete('/:id')
    deleteRecord(@Param('id') _id:string){
        return this._locationService.deleteOne(_id).then((res)=>({
            result: res,
            message:'successfull'
        })).catch((err)=>({
            message:`Error message ${err}`
        }));
    }
}
