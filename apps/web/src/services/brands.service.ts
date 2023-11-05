import { IBrand } from "@ecommerce-store/common";
import { BaseApiService } from "@/services/base-api.service";


class BrandsAPIService extends BaseApiService<IBrand> {
  constructor() {
    super('brands');
  }
}

export const BrandsService = new BrandsAPIService();
