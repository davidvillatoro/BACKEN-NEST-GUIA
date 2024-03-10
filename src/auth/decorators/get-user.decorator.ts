import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";



export const GetUser = createParamDecorator(

    (data: string , ctx: ExecutionContext ) =>{

        const req = ctx.switchToHttp().getRequest(); //esto es para caprutar los datos del usuario cuado hacen login
        const user = req.user;

        if (!user) {
            throw new InternalServerErrorException(`User not found (request)`);
        }

        return user;    
    }

);