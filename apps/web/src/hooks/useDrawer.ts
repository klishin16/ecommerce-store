import { useState } from "react";
import { IDrawerCloseParams, IDrawerParams } from "@/types";

interface IUseDrawerOptions {
    onClose?: (params?: IDrawerCloseParams) => void
}

interface IUseDrawerReturn<T extends { id:  number }> {
    drawerProps: {
        params: IDrawerParams<T>;
        onClose: (params?: IDrawerCloseParams) => void;
    };
    openDrawer: (data?: T) => void;
}

export const useDrawer = <T extends { id: number }>(options?: IUseDrawerOptions): IUseDrawerReturn<T> => {
    const drawerInitialState: IDrawerParams<T> = {
        open: false,
        mode: 'create',
        data: null
    }
    const [drawerParams, setDrawerParams] = useState<IDrawerParams<T>>(drawerInitialState);

    const showDrawer = (data?: T) => {
        setDrawerParams({
            open: true,
            mode: data ? 'edit' : 'create',
            data: data ?? null
        });
    };

    const onDrawerClose = (params?: IDrawerCloseParams) => {
        setDrawerParams(drawerInitialState);
        if (options?.onClose) {
            options.onClose(params);
        }
    };

    return {
        drawerProps: {
            params: drawerParams,
            onClose: onDrawerClose
        },
        openDrawer: showDrawer
    }
}
