// src/auth/interfaces/user-payload.interface.ts

import { Role } from '../../common/enum/role.enum';

export interface UserPayload {
  userId: number;
  email: string;
  role: Role;
}