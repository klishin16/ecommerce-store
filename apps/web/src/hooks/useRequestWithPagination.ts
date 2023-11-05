'use client'
import { useCallback, useState } from "react";
import { IPagination } from "@ecommerce-store/common";

export interface IUseRequestWithPaginationOptions {
  pagination: {
    offset: number;
    limit: number;
  }
}

export const useRequestWithPagination = <Data>(
  request: (pagination: IPagination) => Promise<{ data: Array<Data>; total: number }>,
  options?: IUseRequestWithPaginationOptions
) => { // [Data[] | null, boolean]
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data[] | null>(null);

  const paginationInitialState: IPagination = {};
  if (options?.pagination.offset) {
    paginationInitialState.skip = options.pagination.offset;
  }
  if (options?.pagination.limit) {
    paginationInitialState.limit = options.pagination.limit;
  }
  const [pagination, setPagination] = useState<IPagination>(paginationInitialState);
  const [total, setTotal] = useState<number>(0);

  useCallback(() => {
    setLoading(true);
    request(pagination)
      .then(({ data, total }) => {
        setData(data);
        setTotal(total);
      })
      .finally(() => setLoading(false))
  }, [pagination, request])

  const loadNextPage = () => {
    setPagination((currentPagination) => ({
      ...currentPagination,
      skip: (currentPagination.skip ?? 0) + (currentPagination.limit ?? 5)
    }))
  }

  return {
    data, 
    loading,
    loadNextPage,
    total,
    page: pagination.skip
  }
}
