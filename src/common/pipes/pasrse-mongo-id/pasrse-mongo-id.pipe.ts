import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';


//bamos a crear un pipe para evaular que id se un mongoid
@Injectable()
export class PasrseMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

      //berificamos que el id mandado se un MongoId de los contrario mandamos una exception 
      if ( !isValidObjectId(value)) {
        throw new BadRequestException( ` el ${value} no es MongoId Valido`);
      }

    return value;
  }
}
