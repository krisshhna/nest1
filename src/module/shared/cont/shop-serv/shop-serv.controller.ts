import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ShopServService } from './shop-serv.service.js';

@Controller('shop-serv')
export class ShopServController {
    constructor(public shopServ:ShopServService){}

    @Post()
    create(@Body() rec:any){
        return this.shopServ.create(rec).then((data)=>({
            result: data
        })).catch((err)=>({
            message:`Error message ${err}`
        }));
    }

    @Get()
    findAll(){
        return this.shopServ.findAll().then((data)=>({
            result:data,
        })).catch((err)=>({
            message:`Error message ${err}`
        }));
    }

    @Get('/:id')
    findOne(@Param('id') _id:string){
        return this.shopServ.findOne(_id).then((data)=>({
            result:data
        })).catch((err)=>({
            message:`Error message ${err}`
        }));
    }

    @Post('/:id')
    updateOne(@Param('id') _id:string, @Body() rec:any){
        return this.shopServ.updateOne(_id, rec).then((data)=>({
            result:data
        })).catch((err)=>({
            message:`Error message ${err}`
        }));
    }

    @Delete('/:id')
    deleteOne(@Param('id') _id:string){
        return this.shopServ.deleteOne(_id).then((data)=>({
            result:data
        })).catch((err)=>({
            message:`Error message ${err}`
        }));
    }
}