export const byUserIdQuery = (id: string) : object => ({
  query: {
    poolShares: {
      __args: {
        where: {
          userAddress: id
        }
      },
      id: true,
      balance: true,
      userAddress: {
        id: true
      },
      poolId: {
        id: true
      }
    }
  }
})
