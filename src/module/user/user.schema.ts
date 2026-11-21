import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection:'mainusers', timestamps:true})
export class User{
    @Prop({
        type:String,
        required:true
    })
    name:string;

    @Prop({
        type:String,
        required:true,
        unique:true
    })
    email:string;

    @Prop({
        type:String,
        required:true,
    })
    password:string;

    @Prop({
        type:Number,
        required:true,
    })
    age:number;

    @Prop({
        type:String,
        required:true,
    })
    gender:string;

    @Prop({
        type:Number,
        required:true,
    })
    phone:number;

    @Prop({
        type:[{
            street:{type:String, required:true},
            state:{type:String, required:true},
            city:{type:String, required:true},
            location:{type:String, required:true},
            pincode:{type:Number, required:true},
        }],
        required:true,
    })
    address:{street:string, state:string, city:string, location:string, pincode:number}[];
}
export const UserFactory = SchemaFactory.createForClass(User);