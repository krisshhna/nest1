import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection:'shopService', timestamps:true})
export class ShopServ{
    @Prop({type:String, required:true})name:string;
    @Prop({type:Boolean, required:true})status:boolean;
}
export const shopServFactory = SchemaFactory.createForClass(ShopServ);