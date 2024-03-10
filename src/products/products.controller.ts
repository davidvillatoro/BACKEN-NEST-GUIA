import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PasrseMongoIdPipe } from 'src/common/pipes/pasrse-mongo-id/pasrse-mongo-id.pipe';//creado pipe de mongid
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth()
  create(@Body() createProductDto: CreateProductDto, 
    @GetUser() user: User
  ) {
    return this.productsService.create(createProductDto , user);
  }

  @Get()
    @Auth()
  findAll( @Query() paginacionDto: PaginationDto ,) { //bamos a recibir todos lo queryParams con nest @Query
    console.log(paginacionDto);
    
    return this.productsService.findAll( paginacionDto );
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOne( term);
  }

  @Patch(':id')
  update(@Param('id', PasrseMongoIdPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update( id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', PasrseMongoIdPipe ) id: string) {  //ParseMongoIdPipe es para verificar que sea un mongo id  del comom pipes mongoid
    return this.productsService.remove( id);
  }
}
