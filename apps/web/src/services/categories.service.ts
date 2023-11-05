import { ICategory } from "@ecommerce-store/common";
import { BaseApiService } from "@/services/base-api.service";


class CategoriesApiService extends BaseApiService<ICategory> {
    constructor() {
        super('categories');
    }
}

export const CategoriesService = new CategoriesApiService();
