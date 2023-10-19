import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "./entities/brand.entity";
import { Repository } from "typeorm";

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

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.brandRepository.update({ id }, updateBrandDto);
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
