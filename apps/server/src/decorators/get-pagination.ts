import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { IPagination } from "@ecommerce-store/common";

export const GetPagination = createParamDecorator((data, ctx: ExecutionContext): IPagination => {
  const req: Request = ctx.switchToHttp().getRequest();

  const paginationParams: IPagination = {
    skip: 0,
    limit: 10,
    sort: [],
    search: []
  };

  paginationParams.skip = req.query.skip ? parseInt(req.query.skip.toString()) : 0;
  paginationParams.limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10;

  // create array of sort
  if (req.query.sort) {
    const sortArray = req.query.sort.toString().split(',')
    paginationParams.sort = sortArray.map(sortItem => {
      const sortBy = sortItem[0]
      switch (sortBy) {
        case "-":
          return {
            field: sortItem.slice(1),
            by: 'ASC'
          }
        case "+":
          return {
            field: sortItem.slice(1),
            by: 'ASC'
          }
        default:
          return {
            field: sortItem.trim(),
            by: 'DESC'
          }
      }
    })
  }

  // create array of search
  if (req.query.search) {
    const searchArray = req.query.search.toString().split(',')
    paginationParams.search = searchArray.map(searchItem => {
      const field = searchItem.split(":")[0]
      const value = searchItem.split(":")[1]
      return {
        field,
        value
      }
    })
  }

  console.log('paginationParams', paginationParams)

  return paginationParams;
})
