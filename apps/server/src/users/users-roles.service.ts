import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UsersRolesService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

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
}