import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserTypeService } from './user-type.service.js';

@Controller('user-type')
export class UserTypeController {
    constructor(public _userType:UserTypeService){}

    @Post()
    createType(@Body() body:any){
        return this._userType.addType(body).then((res)=>({
            result:res,
            message:'Record added successfully!'
        })).catch((err)=>({
            message:`Issue while adding record ${err}`
        }));
    }

    @Get()
    allListing(){
        return this._userType.allList().then((res)=>({
            result:res,
            message:`All records`
        })).catch((err)=>({
            message:`Error message ${err}`
        }));
    }

    @Get(':id')
    singleList(@Param('id') _id:string){
        return this._userType.findOne(_id).then((res)=>({
            result:res,
            message:'Successfull'
        })).catch((err)=>({
            message:`Issue in api ${err}`
        }))
    }

    @Post()
    updateRec(@Body() rec:any){
        return this._userType.updateList(rec).then((res)=>({
            result:res,
            message:'Successfull'
        })).catch((err)=>({
            message:`Issue in api ${err}`
        }));
    }

    @Delete(':id')
    deleteRec(@Param('id') rec:any){
        return this._userType.deleteRec(rec).then((res)=>({
            result:res,
            message:'Successfull'
        })).catch((err)=>({
            message:`Issue in api ${err}`
        }));
    }
}
