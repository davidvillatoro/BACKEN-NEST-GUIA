import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ValidRoles } from './interfaces';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService:JwtService,
  ){}

  async create(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLocaleLowerCase().trim();//para poner en minuscula el correo, elimine espacios de adelante y de ultimo  ejem.=  '  hola  '  trim() = 'hola'


    try {

      const {password, ...userData} = createUserDto;
      
      const user  = await this.userModel.create( {
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      const { email, fullName, id, isActive, roles}= user; 
      return { 
        email, fullName, id, isActive, roles,
        token: this.getJwtToken( { _id: user.id })
      };

    } catch (error) {
      this.manejoDeExcepcion(error);
    }
   
  };


  async login(loginUserDto: LoginUserDto){

   const {password, email} = loginUserDto;
   const user = await this.userModel.findOne({ email }).select({  email: true , password: true,  _id: true, });//para usar el select para dos cantidades

   if (!user) { // si el  usuario no existe
     throw new UnauthorizedException(`Credencialesno validas (email)`);
    }
    
    if(!bcrypt.compareSync( password , user.password )) //compara si es la misma password
    throw new UnauthorizedException(`Credencialesno validas (password)`);   

   return  {
    email,
    password,
      token: this.getJwtToken({ _id: user._id})
   };
   //Retornar el JWT

  };


  //metodo para generar jwt
  private getJwtToken(payload: JwtPayload){

    //generar el token 
    const token = this.jwtService.sign( payload ); //para firmar el token
    return token;


  }


   //manejo de error  == duplicados y ecepcciones
   private manejoDeExcepcion( error: any ){
    if (error._message === 'User validation failed') {
      throw new BadRequestException(`Valores no validos en campo roles:, roles validos { 'admin', 'super-user' , 'user'}`)
    }
    
    if( error.code === 11000){
      throw new BadRequestException(`Producto ya existe en la bbdd ${ JSON.stringify( error.keyValue ) }`)
    }
    console.log(error);
    throw new InternalServerErrorException(` Creacion pokemon - revisar check log del server`)

  }




}



   







