import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities/user.entity';


@Injectable()
export class ProductsService {

  //creacion de contructor
  constructor(
    @InjectModel(Product.name) //esta es la forma de injectar el modelo en mongo
    private readonly productModel: Model<Product>,//instacia del model de product de entitis es de este tipo el productModel
  ){}





  //----------------------CREAR Producto
  async create(createProductDto: CreateProductDto, user: User) {
    
      try {
        //---configuracion para el slug que ba copiar lo del titulo
        if (!createProductDto.slug) {
          createProductDto.slug = createProductDto.title //que el valor del slug ba ser el del title
           .toLocaleLowerCase() //ba der minuscula todo
           .replaceAll(' ', '_')//ba remplazar el espcaio ' '  por un menos _
           .replaceAll("'","") //remplaza la ' por un espacio
        }else{
          createProductDto.slug = createProductDto.title
           .toLocaleLowerCase()
           .replaceAll(' ', '_')
           .replaceAll("'","")

        }
      
        const producto = await this.productModel.create({
          ...createProductDto,
          user
        } ); //para crear en la bbdd
        return producto;
        
      } catch (error) {

        this.manejoDeExcepcion(error)
      
      }

  };






//--------------------------------busqueda por paginacion
  findAll( paginacionDto:PaginationDto ) {

    const { limit=10, offset = 0 } =paginacionDto;

    return this.productModel.find()
      .limit( limit)
      .skip( offset)
      .select('-__v') //esto es para que no se mueste la v  que biene por default en mongo
  };






//-------------busqueda indibidual---------------------
  async findOne(term: string) { //le cambias de id a term que hace ref a termino por que bamos abuscar por id y slug

    let product: Product;

    if (!product && isValidObjectId( term)) {  //esto quiere decir si no hay un pokemon y es un mongoid hace el if
       product = await this.productModel.findById( term)
    }

    if (!product) { //si no hay un producto busca por el slug

      product = await this.productModel.findOne({ slug: term})
    }
    

    if( !product)  throw new NotFoundException(`Producto con name o slug ${term} no existe`) //por si mandan otro termino aparte del id y el slug

    return product;
   
  };




//--------------actualizar-----------
  async update(id: string, updateProductDto: UpdateProductDto) {

/*     const { image, } = updateProductDto; */
 /*    const product  = await this.findOne(id) */

    try {
      //---configuracion para el slug que ba copiar lo del titulo
      if (!updateProductDto.slug) {
        updateProductDto.slug = updateProductDto.title //que el valor del slug ba ser el del title
         .toLocaleLowerCase() //ba der minuscula todo
         .replaceAll(' ', '_')//ba remplazar el espcaio ' '  por un menos _
         .replaceAll("'","") //remplaza la ' por un espacio
      }else{            
        updateProductDto.slug = updateProductDto.title
         .toLocaleLowerCase()
         .replaceAll(' ', '_')
         .replaceAll("'","")

      }   
      
   /*    if (image) {

        this.productModel.deleteOne()
        
      }
 *//* 
            await product.updateOne( updateProductDto,) // actualizar data
            return  { ...product.toJSON(), ...updateProductDto}; */
       
         const product = await this.productModel.findByIdAndUpdate( id , updateProductDto, {new : true} ); 
    
        if (!product) {
          throw new BadRequestException(`Producto con id ${id} no existe`)
          
        }
    
        return product ; 


    } catch (error) {

      this.manejoDeExcepcion(error)
      
    }


  };




  //-------------------eliminacion de producto

  async remove(id: string) {

    /*   const pokemon = await this.findOne( id );
     await pokemon.deleteOne(); // llamos el metod de arriba pero cuando no hay un custom pipe de mongoId*/
    
    const {deletedCount} = await this.productModel.deleteOne({ _id: id}); // -- este se hace cuando ya creamos es pipe de MONGOID

    if (deletedCount === 0) { // el deletCount muesta los archivos en la bbdd , si es 0 manda el error que no existe el producto
      throw new BadRequestException(`Producto con id ${id} no existe`)
     }

    return ; // regresa un starus 200
  };





  //manejo de error  == duplicados y ecepcciones
  private manejoDeExcepcion( error: any ){
    
    if( error.code === 11000){
      throw new BadRequestException(`Producto ya existe en la bbdd ${ JSON.stringify( error.keyValue ) }`)
    }
    console.log(error);
    throw new InternalServerErrorException(` Creacion pokemon - revisar check log del server`)

  }


}
