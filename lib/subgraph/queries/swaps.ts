const now = Math.round(new Date().getTime() / 1000)
const tsYesterday = now - 48 * 3600

export const last24hQuery = () : object => ({
  query: {
    swaps: {
      __args: {
        first: 1000,
        orderBy: 'timestamp',
        orderDirection: 'desc',
        where: {
          timestamp_lt: tsYesterday
        }
      },
      tokenIn: true,
      tokenInSym: true,
      tokenOutSym: true,
      tokenOut: true,
      tokenAmountIn: true,
      tokenAmountOut: true,
      timestamp: true,
      poolAddress: {
        id: true
      }
    }
  }
})
