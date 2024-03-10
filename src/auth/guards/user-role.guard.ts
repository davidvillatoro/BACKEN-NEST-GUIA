import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { META_ROLES } from '../decorators';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector:Reflector //ayuda a ver info de los decoradores y la metadata
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRole: string[] = this.reflector.get(META_ROLES, context.getHandler()) //capturar la info de la metadata

    if (!validRole) return true;

    if (validRole.length === 0 ) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user)  throw new BadRequestException(`user no found`);

    for (const role of user.roles) {

      if( validRole.includes(role)){
        return true;
      }
      
    }
    
    throw new ForbiddenException( `User ${user.fullName} need a valid role: [${ validRole}]`)
  };
}
