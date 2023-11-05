import React from "react";

export type TableColumnProps = {
    title: string,
    dataIndex: string,
    key: string | number,
    render?: any;
}
export interface IGenerateTableColumnProps {
    title: string;
    key?: number | string;
    render?: any;
}

export function generateTableConfig(columnProps: IGenerateTableColumnProps[]): TableColumnProps[] {
    return columnProps.map((columnProps: IGenerateTableColumnProps) => {
        return {
            title: columnProps.title.length >= 2 ? columnProps.title[0].toUpperCase() + columnProps.title.slice(1) : columnProps.title,
            dataIndex: columnProps.title,
            key: columnProps.key ?? columnProps.title,
            render: columnProps.render
        }
    })
}
