import { Module } from '@nestjs/common';
import { BasketsService } from './baskets.service';
import { BasketsController } from './baskets.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Basket } from "./entities/basket.entity";
import { User } from "../users/entities/user.entity";
import { PurchasesService } from "./purchases.service";
import { Purchase } from "./entities/purchase.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Basket, Purchase])],
    controllers: [BasketsController],
    providers: [BasketsService, PurchasesService],
})
export class BasketsModule {
}
