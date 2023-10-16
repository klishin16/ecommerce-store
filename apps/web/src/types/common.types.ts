export interface IDrawerCloseParams {
    refreshItems?: boolean;
}

export interface IDrawerParams<T extends { id: number }> {
    open: boolean;
    mode: 'create' | 'edit';
    data: T | null;
}

export interface ICreationDrawerProps<T extends { id: number }> {
    token: string;
    params: IDrawerParams<T>;
    onClose: (params?: IDrawerCloseParams) => void;
}
