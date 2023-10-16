import { ICategory } from "@ecommerce-store/common";

export type LeafCategoryMap = Map<number, ICategory[]>

export type CategoriesTree = {
    highCategories: ICategory[];
    leafCategories: LeafCategoryMap;
}

export function buildCategoriesTree(categories: ICategory[]): CategoriesTree {
    const highCategories = new Array<ICategory>();
    const leafCategories = new Map<number, ICategory[]>();
    categories.map(category => {
        if (!category.parentId) {
            highCategories.push(category)
        } else {
            leafCategories.has(category.parentId!) ? leafCategories.get(category.parentId!)!.push(category) :  leafCategories.set(category.parentId!, [category])
        }
    })

    return {
        highCategories,
        leafCategories
    }
}
