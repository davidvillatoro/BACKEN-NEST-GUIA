import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {

    @IsOptional()
    @IsPositive()
    //transformar  --seunda forma y no de pipe globals en main  de pokemon
    @Type( () => Number ) //esto hace la convercion de string a number --forma 2
    limit?: number;
    
    
    @IsOptional()
    @Min(0)
    @Type( () => Number ) //esto hace la convercion de string a number --forma 2
    offset?: number;

}