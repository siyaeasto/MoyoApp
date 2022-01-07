import { UserViewModel } from './user-view-model';

export class LoginViewModel {
    loginId: number;
    ipAddress: string;
    passed: boolean;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    User: UserViewModel;
}
