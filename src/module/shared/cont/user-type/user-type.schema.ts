import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection:'userType', timestamps:true})
export class userType{
    @Prop({
        type:String,
        required:true
    })
    name:string;

    @Prop({
        type:Array,
        required:true
    })
    access:[];
}
export const userTypeFactory = SchemaFactory.createForClass(userType);