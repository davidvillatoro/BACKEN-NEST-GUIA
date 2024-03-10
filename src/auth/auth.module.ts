import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],  //mandamos a llamar el jwtstrategy, para evaluar los jwt 

  //c0onfiguracion del model de USER para poder usarlo en services y controles
  imports: [
    ConfigModule,
    MongooseModule.forFeature([ 
      {
        name: User.name,
        schema: UserSchema,
      }
     ]),

     //la pasport module de la authetication pasport
     PassportModule.register({ defaultStrategy: 'jwt'}),
     //configuracion del jwt
     JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ], 
      useFactory: ( configService: ConfigService ) =>{

        return {
          secret: configService.get('JWT_SECRET'),
        signOptions:{
          expiresIn: '3h'
        }

        }
      }
     })

     /* JwtModule.register({
        secret: '151515154158',
        signOptions:{
          expiresIn: '3h'
        }
     }) */

  ],



  // exportamos el modulo de User para que pueda ser utilizado en otrso servicios
  exports: [
    MongooseModule,
    JwtStrategy,
    PassportModule,
    JwtModule,
  ]

})
export class AuthModule {}
