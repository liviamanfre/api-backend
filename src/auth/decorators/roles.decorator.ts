// src/auth/decorators/roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enum/role.enum';

// Esta é a chave que usaremos para armazenar e recuperar os metadados
export const ROLES_KEY = 'roles';

// A função Roles recebe uma lista de papéis e os anexa aos metadados da rota
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);