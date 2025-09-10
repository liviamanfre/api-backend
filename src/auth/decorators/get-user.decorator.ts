// src/auth/decorators/get-user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Este decorator extrai o objeto 'user' que foi anexado à requisição pelo AuthGuard (JwtStrategy)
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);