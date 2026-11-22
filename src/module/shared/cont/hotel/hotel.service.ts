import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc, ClientProxy } from '@nestjs/microservices';
import {  Observable } from 'rxjs';

interface HotelGrpcService {
  FindAllRec(data: {}): Observable<any>;
  FindOne(data: { id: string }): Observable<any>;
  CreateHotel(data: any): Observable<any>;
  UpdateHotel(data: any): Observable<any>;
  DeleteHotel(data: { id: string }): Observable<any>;
}

@Injectable()
export class HotelService implements OnModuleInit{
    public hotelGrpc:HotelGrpcService;
    constructor(@Inject('Hotel_CRUD') public client:ClientGrpc){}

    onModuleInit() {
        this.hotelGrpc = this.client.getService<HotelGrpcService>('HotelService');
    }

    async findAll(){
        return await this.hotelGrpc.FindAllRec({});
    }

    findOne(){
    }

    createHotel(){
    }

    updateHotel(){
    }

    deleteHotel(){
    }
}
