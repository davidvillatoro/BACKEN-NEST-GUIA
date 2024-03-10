import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
 //intalamos yarn add @nestjs/mongoose mongoose para utilizar mongodb

@Module({
  imports: [

    //configurar para usar el archivo ".env" --- pero antes instalamos el paquete de variables de entorno "yarn add @nestjs/config" --ojo simpre ba al inicio "ConfigModule.forRoot()," se deja asi de lo contrario si hay un archivo es laod: y el archivo
    ConfigModule.forRoot(),
//-----------------------------vide 17 de la seccion 7
    MongooseModule.forRoot(process.env.MONGODB_CADENA),

    ServeStaticModule.forRoot({  //configuarion para servir contenido estatico
      rootPath: join(__dirname,'..','public'),
      }),

    CommonModule,

    ProductsModule,

    SeedModule,

    FilesModule,

    AuthModule,

   ],

})
export class AppModule {}
