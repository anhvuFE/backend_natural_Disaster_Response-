import { UserRole } from '../../models/user.model';

declare global {
  namespace Express {
    interface UserInfo {
      id: string;
      email: string;
      role: UserRole;
      name: string;
    }
    interface Request {
      user?: UserInfo;
    }
  }
}

export {};
