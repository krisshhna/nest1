import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection:'location', timestamps:true})
export class Location{
    @Prop({type:String,required:true})name:string;
    @Prop({type:[{name:{type:String, required:true}}],required:true})cities:{name:string}[];
}
export const locationFactory = SchemaFactory.createForClass(Location);