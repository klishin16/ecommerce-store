export type TableColumnProps = {
    title: string,
    dataIndex: string,
    key: string,
    render?: any
}
export type generateTableColumnProps = {
    title: string,
    render?: any
}

export function generateTableConfig(columnProps: generateTableColumnProps[]): TableColumnProps[] {
    return columnProps.map((columnTitle: generateTableColumnProps) => {
        return {
            title: columnTitle.title.length >= 2 ? columnTitle.title[0].toUpperCase() + columnTitle.title.slice(1) : columnTitle.title,
            dataIndex: columnTitle.title,
            key: columnTitle.title,
            render: columnTitle.render
        }
    })
}
