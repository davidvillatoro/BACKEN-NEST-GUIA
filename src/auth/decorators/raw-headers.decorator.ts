import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";



export const RawHeaders = createParamDecorator(

    (data: string , ctx: ExecutionContext ) =>{

        const req = ctx.switchToHttp().getRequest(); //esto es para caprutar los datos del usuario cuado hacen login
        return req.rawHeaders;
        
    }

);