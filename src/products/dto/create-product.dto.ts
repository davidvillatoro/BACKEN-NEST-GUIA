import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";


export class CreateProductDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    preci?: number; //el signo "?" significa que es opccional
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsString()
    @IsOptional()
    slug?: string;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock: number;

    
    @IsString({ each: true })//quiere decir que cada elemento del arreglo tiene que ser estring 
    @IsArray()
    sizes: string[];

    @IsIn(['men', 'women' , 'kid' , 'unisex']) //que solo pueden tener estos datos
    gender: string;
    
    @IsString({ each: true })//quiere decir que cada elemento del arreglo tiene que ser estring 
    @IsArray()
    @IsOptional()
    tags: string[];
    
    
    @IsString({ each: true })//quiere decir que cada elemento del arreglo tiene que ser estring 
    @IsArray()
    @IsOptional()
    images?: string[];

    
}
