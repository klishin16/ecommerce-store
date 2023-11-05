import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { WithFiltersDto } from "./dto/with-filters.dto";
import { GetPagination } from "../decorators/get-pagination";
import { IPagination } from "@ecommerce-store/common";

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get('with-pagination')
  findWithPagination(@GetPagination() pagination: IPagination) {
    console.log('here')
    return this.devicesService.findWithPagination(pagination);
  }

  @Post('with-filters')
  findWithFilters(@Body() withFiltersDto: WithFiltersDto) {
    return this.devicesService.findWithFilters(withFiltersDto);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
}
