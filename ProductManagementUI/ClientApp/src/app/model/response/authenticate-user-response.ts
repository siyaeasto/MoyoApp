import { UserViewModel } from './../view/user-view-model';
import { SystemUserPermissionViewModel } from './../view/system-user-permission-view-model';

export class AuthenticateUserResponse extends Response {
  accessToken: string;
  data: UserViewModel;
  Role: SystemUserPermissionViewModel[];
  Permissions: SystemUserPermissionViewModel[];
}
