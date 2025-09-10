// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service'; // Importar UsersService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Vamos injetar o UsersService para buscar o usuário completo, incluindo o papel
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SEU_SEGREDO_SUPER_SECRETO',
    });
  }

  // Este método é chamado após o token ser decodificado com sucesso
  async validate(payload: any) {
    // Buscamos o usuário no banco para garantir que ele ainda existe e para pegar o papel mais atualizado
    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      return null;
    }
    
    // O que for retornado aqui será anexado ao objeto request (req.user)
    // Agora, req.user terá id, email e role
    return { userId: user.id, email: user.email, role: user.role };
  }
}