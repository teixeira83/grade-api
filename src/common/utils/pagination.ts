const setPagination = (page: number, limit: number, count: number) => {
  const startIndex = (page - 1) * limit
  const lastPage = Math.ceil(count / limit)
  const hasNext = lastPage > page
  const hasPrevious = page - 1 !== 0

  return {
    take: limit,
    skip: startIndex,
    hasNext,
    hasPrevious,
    currentPage: page,
    lastPage
  }
}

export { setPagination }
