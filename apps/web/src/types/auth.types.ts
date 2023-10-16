import { IUser } from "@ecommerce-store/common";

export interface IAuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: IUser | null;
    isLoading: boolean;
}
