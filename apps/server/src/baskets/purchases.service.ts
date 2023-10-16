import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Basket } from "./entities/basket.entity";
import { AddDeviceDto } from "./dto/add-device.dto";
import { Purchase } from "./entities/purchase.entity";

@Injectable()
export class PurchasesService {
    constructor(@InjectRepository(Purchase) private purchasesRepository: Repository<Purchase>) {
    }

    // async addUserRole(addUserRoleDto: AddUserRoleDto) {
    //     const user = await this.userRepository.findOne({ where: { id: addUserRoleDto.userId } });
    //     if (!user) {
    //         throw new NotFoundException('User not found!')
    //     }
    //     const role = await this.roleRepository.findOne({ where: { value: addUserRoleDto.value } });
    //     if (!role) {
    //         throw new NotFoundException('Role not found!')
    //     }
    //     user.roles = [...user.roles, role];
    //     return this.userRepository.save(user);
    // }
    //
    // async removeUserRole(removeUserRoleDto: RemoveUserRoleDto) {
    //     const user = await this.userRepository.findOne({ where: { id: removeUserRoleDto.userId } });
    //     if (!user) {
    //         throw new NotFoundException('User not found!')
    //     }
    //     const role_to_remove = await this.roleRepository.findOne({ where: { value: removeUserRoleDto.value } });
    //     if (!role_to_remove) {
    //         throw new NotFoundException('Role not found!')
    //     }
    //     user.roles = user.roles.filter((role) => role.value !== role_to_remove.value);
    //     return this.userRepository.save(user);
    // }
    async addDevice(addDeviceDto: AddDeviceDto) {
        // TODO один запрос
        const purchase = await this.purchasesRepository.save({
            ...addDeviceDto
        })

        return this.purchasesRepository.findOne({ where: { id: purchase.id }, relations: { device: true } })
    }

    async removeDevice(addDeviceDto: AddDeviceDto) {

    }
}