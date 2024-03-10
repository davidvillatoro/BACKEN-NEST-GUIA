import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';


@Injectable()
export class SeedService {

  constructor (
    @InjectModel( Product.name )

    private readonly productModel: Model<Product>, //mandamos a llamar el modelo de productos

  ){}
  


  async runSeed( ){  // creamos un metodo get y correr semilla

    // este runSeed ba a llamar el metodo privado 
    await this.insertNewProducts( );

    return 'SEED EXECUTED'; //mensaje que muestra en pantalla
  }



  //mandar a llamar de un modulo a otro seria de product a semilla 

  private async insertNewProducts( ){  // creamos el metodo privado de insertar productos
    await this.productModel.deleteMany();//borramos todo en la bbdd

    const products = initialData.products; //llamamos de la bbdd local para los products en seed -data

    const inserPromises = []; //creamos un arreglo
    /*
    products.forEach( product => { 
      inserPromises.push(this.productModel.create(product)); // usamos el metodo push de los arrelos para llamar el metodo create de los productos  y le damos el product que viene de la bbdd local  lo ba recibir que es lo mismo que biene de postman la misa sintaxis o el mismo dto.
    });
    */
    await Promise.all(inserPromises);// insertamos de forma masiva todas los promesas



    return true;
  }
  
}
