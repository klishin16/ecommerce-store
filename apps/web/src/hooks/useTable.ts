'use client'
import { useEffect, useState } from "react";
import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { IPaginationResponseData } from "@ecommerce-store/common";


export interface ITablePagination<T> {
  pagination: TablePaginationConfig;
  filters: Record<string, FilterValue | null>;
  sorter: SorterResult<T> | SorterResult<T>[]
}

export interface ITableProps<T> {
  loading: boolean;
  dataSource: T[];
  pagination: TablePaginationConfig;
  onChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => void;
}

export interface IUseTable<T> {
  tableProps: ITableProps<T>;
  loading: boolean;
  refresh: () => void;
}

export const useTable = <Data>(request: (pagination: ITablePagination<Data>) => Promise<IPaginationResponseData<Data>>): IUseTable<Data>  => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data[] | null>(null);

  const [exec, setExec] = useState(false);

  const [pagination, setPagination] = useState<ITablePagination<Data>>({
    pagination: {
      current: 1,
      pageSize: 8,
      total: 0
    },
    filters: {},
    sorter: []
  });

  useEffect(() => {
    setLoading(true);
    console.log('load')
    request(pagination)
      .then(response => {
        setData(response.data);
        setPagination(prevState => ({
          ...prevState,
          pagination: {
            ...prevState.pagination,
            total: response.count
          }
        }))
      })
      .finally(() => setLoading(false))
  }, [pagination.pagination.current, pagination.pagination.pageSize, exec]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Data> | SorterResult<Data>[]
  ) => {
    setPagination({
      sorter,
      filters,
      pagination
    });
  };

  const refreshHandler = () => {
    setPagination(prevState => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        current: 1
      }
    }))
    setExec((prevState) => !prevState);
  }


  return {
    tableProps: {
      loading,
      dataSource: data ?? [],
      pagination: pagination.pagination,
      onChange: handleTableChange
    },
    loading,
    refresh: refreshHandler
  }
}
