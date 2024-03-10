import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Product,  ProductSchema } from './entities';
import { AuthModule } from 'src/auth/auth.module';
/* import { Product, ProductSchema } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity'; */

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],

  //configuracion de la bbdd mongo y nest
  //importamos el modulo para llamar el esquema de products
  imports: [  
    ConfigModule, //los exportamos para poder usar las propiedades de mongo
    MongooseModule.forFeature([
      //definimos las entidades  de los esquemos como es solo una de la products
      {
        name: Product.name, //mandamos a llamar el nombre de la clase
        schema: ProductSchema,  //llamamos el nombre del esquema de la clase
        
      }

    ]),
    AuthModule,
  ],

  //bamos a exportar el modulo de product service
  exports: [
    MongooseModule
  ]


})
export class ProductsModule {}
