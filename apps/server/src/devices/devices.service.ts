import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Device } from "./entities/device.entity";
import { Repository } from "typeorm";
import { WithFiltersDto } from "./dto/with-filters.dto";

@Injectable()
export class DevicesService {
  constructor(@InjectRepository(Device) private readonly deviceRepository: Repository<Device>) {
  }
  create(createDeviceDto: CreateDeviceDto) {
    return this.deviceRepository.save({ ...createDeviceDto });
  }

  findAll() {
    return this.deviceRepository.find({ relations: ['brand'] });
  }

  findOne(id: number) {
    return this.deviceRepository.findOne({ where: { id } })
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return this.deviceRepository.update({ id }, updateDeviceDto)
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }

  findWithFilters(withFiltersDto: WithFiltersDto) {
    console.log('findWithFilters', withFiltersDto)
    const query = this.deviceRepository.createQueryBuilder('device');

    if (withFiltersDto.maxPrice || withFiltersDto.minPrice) {
      query
          .andWhere('device.price >= :minPrice', { minPrice: withFiltersDto.minPrice ?? 0 })
          .andWhere('device.price <= :maxPrice', { maxPrice: withFiltersDto.maxPrice })
    }

    if (withFiltersDto.brandsIds?.length) {
      query.andWhere('device.brandId IN (:...ids)', { ids: withFiltersDto.brandsIds })
    }

    if (withFiltersDto.categoriesIds?.length) {
      query.andWhere('device.categoryId IN (:...ids)', { ids: withFiltersDto.categoriesIds })
    }

    console.log('findWithFilters -> query', query.getSql())

    return query.getMany()
  }
}
