import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';


@Injectable()
export class FilesService {

    getStaticProductImage( imageName:string){
        //join especifica el path donde nos encontramos
        const path = join(__dirname, '../../static/uploads', imageName);

        if (!existsSync)  throw new BadRequestException(`no product found with image ${imageName}`);

        return path;
    }
  
}
