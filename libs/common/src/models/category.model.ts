export interface ICategory {
    id: number;
    name: string;
    parentId: number | null;
    parent: ICategory | undefined;
    children: ICategory[];
}

export interface ICreateCategoryDto {
    name: string;
    parentCategoryId: number | null;
}

export interface IUpdateCategoryDto extends ICreateCategoryDto {
    id: number;
}
