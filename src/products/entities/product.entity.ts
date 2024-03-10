import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; //importamos de nest y mongo 
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/entities/user.entity";


@Schema()  //damos a entender  que es un esquema de mongdb
export class Product extends Document { // exportamos el documento de mongoose 

    @Prop({
        unique: true,
        index: true,
    })
    title: string;


    @Prop({
        default: 0, 
    })
    preci: number ;

    @Prop()
    description: string;


    @Prop({
        unique: true
    })
    slug: string;

    @Prop({
        default: 0
    })
    stock: number;
    
    @Prop([String])  //arreglo de tallas
    sizes: string[];


    @Prop([String] )  //arreglo de t
    tags: string[];
    
    
    @Prop()
    gender: string;
    
    
    @Prop([String] )  //arreglo de t
    images: string[];

    //relacion de usuario a producto
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
     user: User
  
}


export const ProductSchema =SchemaFactory.createForClass( Product); //exportamos el esquema de la clase
