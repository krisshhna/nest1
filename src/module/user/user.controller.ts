import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../../common/guard/auth/auth.guard.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, public jwt:JwtService) {}

  @Post()
  async create(@Body() rec:any) {
    rec.password = await bcrypt.hash(rec.password,10); 
    return this.userService.create(rec).then((res)=>({
      result: res,
      message:'successfull!!'
    })).catch((err)=>({
      message:`Error message ${err}`
    }))
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req:any) {
    return this.userService.findAll().then((res)=>({
      result: res,
      message:'successfull!!'
    })).catch((err)=>({
      message:`Error message ${err}`
    }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id).then((res)=>({
      result: res,
      message:'successfull!!'
    })).catch((err)=>({
      message:`Error message ${err}`
    }));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() rec: any) {
    return this.userService.update(id, rec).then((res)=>({
      result: res,
      message:'successfull!!'
    })).catch((err)=>({
      message:`Error message ${err}`
    }))
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id).then((res)=>({
      result: res,
      message:'successfull!!'
    })).catch((err)=>({
      message:`Error message ${err}`
    }))
  }

  @Post('login')
  async loginuser(@Body() body:any){
    try{
      let {email, password} = body;
      let verifyEmail = await this.userService.checkEmail(email);
      if(verifyEmail){
        let passCheck = await bcrypt.compare(password, verifyEmail.password);
        if(passCheck){
          let token = await this.jwt.sign({email:email,_id:verifyEmail._id},{secret:`${process.env.JWTSECRET}`, expiresIn:'1h'});
          return {result:{email:email, _id:verifyEmail._id, token:token}};
        }
      }
      throw new UnauthorizedException(`Invalid email or password`);
    }catch(err){
      throw new UnauthorizedException(`Error message12 ${err}`);
    }
  }
}
