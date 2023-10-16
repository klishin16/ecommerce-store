import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Basket } from "./entities/basket.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";

@Injectable()
export class BasketsService {
    constructor(@InjectRepository(Basket) private readonly basketsRepository: Repository<Basket>,
                @InjectRepository(User) private readonly usersRepository: Repository<User>) {
    }

    async create(createBasketDto: CreateBasketDto) {
        const user = await this.usersRepository.findOne({ where: { id: createBasketDto.userId } })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        const basket = new Basket();
        await this.basketsRepository.save(basket);
        user.basket = basket;
        await this.usersRepository.save(user);
        return basket;
    }

    findAll() {
        return this.basketsRepository.find();
    }

    findOne(id: number) {
        return this.basketsRepository.findOne({
            where: { id }, relations: {
                purchases: {
                    device: true
                }
            }
        })
    }

    update(id: number, updateBasketDto: UpdateBasketDto) {
        return `This action updates a #${ id } basket`;
    }

    remove(id: number) {
        return this.basketsRepository.delete({ id })
    }
}
