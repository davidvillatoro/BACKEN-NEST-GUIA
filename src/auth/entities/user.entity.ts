import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; //importamos de nest y mongo 
import mongoose, { Document } from "mongoose";
import { Product } from "src/products/entities";

@Schema()
export class User extends Document {

    @Prop({
        unique: true
    })
    email:string;  

    @Prop({
        type: String, select: false // ocultar la password
    })
    password:string;

    @Prop()
    fullName: string;

    @Prop({
        default: true
    })
    isActive: boolean;

    @Prop({ 
        type: [String],
        default: ['user'],
        enum: ['admin', 'super-user', 'user']
    })
    roles: string[];


}


export const UserSchema = SchemaFactory.createForClass( User );
