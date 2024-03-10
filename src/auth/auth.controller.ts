import { Controller, Get, Post, Body,  UseGuards, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth, RawHeaders, RoleProtected } from './decorators';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }


  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }


  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }


  

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute( 
    @GetUser() user: User,
    @RawHeaders() rawHeaders: string[]
   ){
    return {
      mesage:'hola mundo',
      user,
      rawHeaders
    }
  }


  @Get('private2')
  //@SetMetadata('roles', ['admin','super-user'])
  @RoleProtected(ValidRoles.user, )
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2( 
    @GetUser() user: User,
    
   ){
    return {
      mesage:'hola mundo',
      user,
    }
  }


  @Get('private3')
    @Auth(ValidRoles.admin, ValidRoles.superUser)
  testingPrivateRoute3( 
    @GetUser() user: User,
    
   ){
    return {
      mesage:'hola mundo',
      user,
    }
  }


}
