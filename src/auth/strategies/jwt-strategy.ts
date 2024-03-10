import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

//esta clase es un provider
@Injectable()
export class  JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        configService: ConfigService,
    ){
        super({ 
            secretOrKey: configService.get('JWT_SECRET'), //copia la llave de jwt
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //lo ba mandar en headers beren token
         })
    }

    async validate(payload: JwtPayload):Promise<User>{

        const {_id} = payload;

        const user = await this.userModel.findById({_id});

        if (!user) {
            throw new UnauthorizedException(`Token no valido`);
        }
        if(!user.isActive)
            throw new UnauthorizedException(`usuario no esta activo`);

        return user ;
    }


}