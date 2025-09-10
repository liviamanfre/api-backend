// src/auth/guards/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtém os papéis necessários dos metadados da rota (@Roles(...))
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), // Verifica metadados do método (ex: create)
      context.getClass(),   // Verifica metadados da classe (ex: ProductsController)
    ]);

    // 2. Se a rota não tiver o decorator @Roles, permite o acesso
    if (!requiredRoles) {
      return true;
    }

    // 3. Obtém o usuário do objeto 'request' (que foi anexado pelo AuthGuard)
    const { user } = context.switchToHttp().getRequest();
    
    // Se por algum motivo não houver usuário na requisição, bloqueia o acesso
    if (!user) {
        return false;
    }

    // 4. Compara o papel do usuário com os papéis necessários
    // Retorna 'true' se o usuário tiver pelo menos um dos papéis requeridos
    return requiredRoles.some((role) => user.role === role);
  }
}