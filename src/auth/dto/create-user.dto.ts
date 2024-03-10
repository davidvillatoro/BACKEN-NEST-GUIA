import { IsArray, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength,  } from "class-validator";


export class CreateUserDto{
    @IsEmail()
    @IsString()
    email: string;


    
    //configuramos la password c0on matches es una exprecion regular que dise que tiene que ir una mayuscula , minuscula y un numero
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;



    @IsString()
    @MinLength(1)
    fullName: string;

    @IsString({ each: true })//quiere decir que cada elemento del arreglo tiene que ser estring 
    @IsArray()
    @IsOptional()
    roles: string[];


}