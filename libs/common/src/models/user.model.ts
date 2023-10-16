export enum EUserRoles {
    USER = 'user',
    EDITOR = 'editor',
    ADMIN = 'admin',
}

export interface IUser {
    id: number
    email: string;
    password: string;
    basketId: number | null;
    role: EUserRoles
}

export interface ICreateUserDto {
    email: string;
    password: string;
    role: EUserRoles;
}

export interface IUpdateUserDto extends Partial<ICreateUserDto> {
    id: number;
}
