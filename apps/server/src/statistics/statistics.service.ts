import { Injectable } from '@nestjs/common';
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Injectable()
export class StatisticsService {
    constructor(@InjectDataSource() private dataSource: DataSource) {
    }
    async getStatistics() {
        return this.dataSource.query(`
            WITH users_count as (
                SELECT COUNT(*) as users FROM user
            ), devices_count as (
                SELECT COUNT(*) as devices FROM device
            ), categories_count as (
                SELECT COUNT(*) as categories FROM category
            ), brands_count as (
                SELECT COUNT(*) as brands FROM brand
            )
            SELECT * FROM users_count, devices_count, categories_count, brands_count
        `).then((response) => response[0])
    }
}
