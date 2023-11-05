import { IUser } from "@ecommerce-store/common";
import { BaseApiService } from "@/services/base-api.service";


class UsersApiService extends BaseApiService<IUser> {
  constructor() {
    super('users');
  }
}

export const UsersService = new UsersApiService();
