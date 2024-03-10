import { Controller, Get, Post,  Param, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor( 
    private readonly filesService: FilesService,
    private readonly configService:ConfigService,
  ) {}


  @Get('product/:imageName')
  findProductImage( 
    @Res() res: Response,
    @Param('imageName')  imageName:string
   ){

    const path = this.filesService.getStaticProductImage(imageName)

    res.sendFile( path);
  
  }

  @Post('product') //para que la url tiene que escribir product al final
  @UseInterceptors(FileInterceptor('file', { //le agregamos un interceptor para para llamar el nombre que biene en el body
    fileFilter: fileFilter,//uno es de nest y el otro fileFiter es de los helpers
    storage: diskStorage({  //para subir los archivos
      destination: './static/uploads',
      filename: fileNamer//para cambiarle de nombre a los archivos
    })
  }))
  uploadFile( @UploadedFile() file: Express.Multer.File  ){ // le damos el tipado al archivo 

    if (!file) {  //por si el archivo no biene o no es una imagen
      throw new BadRequestException('asegúrese de que el archivo sea una imagen')
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename} `;


    return {
      secureUrl
    }

  }
 
}
