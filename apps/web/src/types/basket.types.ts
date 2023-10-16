import { IPurchase } from "@ecommerce-store/common";

export interface IBasketState {
    isLoading: boolean;
    purchases: IPurchase[] | null;
    id: number | null;
}
