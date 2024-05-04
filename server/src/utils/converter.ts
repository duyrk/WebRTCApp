import { Request } from 'express'

export const requestToPaginate = (
  req: Request,
  defaultPaginationSetup = {
    page: 1,
    limit: 20,
    sort: 'createdAt',
  },
) => {
  const paginationSetup = { ...defaultPaginationSetup }
  const limit = parseInt(req.query.limit as string)
  const page = parseInt(req.query.page as string)
  const sort = req.query.sortBy as string

  paginationSetup.limit = !isNaN(limit) ? limit : paginationSetup.limit
  paginationSetup.page = !isNaN(page) ? page : paginationSetup.page
  paginationSetup.sort = sort || paginationSetup.sort

  return paginationSetup
}
