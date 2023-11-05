import { IDevicesFilters } from "@/app/components/devices/devices-filter";
import { IDevice } from "@ecommerce-store/common";
import { BaseApiService } from "@/services/base-api.service";


class DevicesApiService extends BaseApiService<IDevice> {
  constructor() {
    super('devices');
  }

  public fetchWithFilters = (filters: IDevicesFilters) => {
    return this.axiosInstance.post<IDevice[]>(this.apiPrefix + '/with-filters', filters)
  }
}

export const DevicesService = new DevicesApiService();
