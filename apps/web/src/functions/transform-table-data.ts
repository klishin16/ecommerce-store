import { ITablePagination } from "@/hooks/useTable";
import { IPagination } from "@ecommerce-store/common";

export const transformTablePaginationToPagination = <T>(tp: ITablePagination<T>): IPagination => ({
  skip: ((tp.pagination.current ?? 1) - 1) * (tp.pagination.pageSize ?? 5),
  limit: tp.pagination.pageSize ?? 5,
})

// sort: Object.fromEntries(
//   Array.isArray(tp.sorter) ?
//     tp.sorter.map(v => [v.field, v.order ? 'ASC' : 'DESC']) :
//     [[tp.sorter.field, tp.sorter.order ? 'ASC' : 'DESC']]
// )
