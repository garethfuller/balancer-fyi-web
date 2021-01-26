type Options = {
  count: number
}

export const latestQuery = (options: Options = { count: 100 }) : object => ({
  query: {
    swaps: {
      __args: {
        first: options.count,
        orderBy: 'timestamp',
        orderDirection: 'desc'
      },
      tokenAmountIn: true,
      poolAddress: {
        id: true
      }
    }
  }
})
