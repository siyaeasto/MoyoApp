import { UserViewModel } from './user-view-model';

export class LogViewModel {
    logId: number;
    ipAddress: string;
    action: string;
    object: string;
    id: number;
    value: string;
    createdAt: Date;
    updatedAt: Date;
    User: UserViewModel;
}
