import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "./entities/brand.entity";
import { Repository } from "typeorm";
import { IBrand, IPagination, IPaginationResponseData } from "@ecommerce-store/common";

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private readonly brandRepository: Repository<Brand>) {
  }
  create(createBrandDto: CreateBrandDto) {
    return this.brandRepository.save({ ...createBrandDto });
  }

  findAll() {
    return this.brandRepository.find();
  }

  async findWithPagination(pagination: IPagination): Promise<IPaginationResponseData<IBrand>> {
    const query = this.brandRepository.createQueryBuilder('user')

    if (!isNaN(pagination.skip) && !isNaN(pagination.limit)) {
      query.skip(pagination.skip)
      query.take(pagination.limit)
    }
    console.log('findWithPagination', query.getSql())

    return query.getManyAndCount().then(response => ({data: response[0], count: response[1]}))
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.brandRepository.update({ id }, updateBrandDto);
  }

  remove(id: number) {
    return this.brandRepository.delete(id);
  }
}
