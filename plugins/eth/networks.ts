import homesteadRegistry from '@balancer-labs/assets/generated/pm/registry.homestead.json'
import { EthConfigObj, EthConfigNetworks } from '~/types'

export const homestead: EthConfigObj = {
  network: 'homestead',
  chainId: 1,
  defaultPrecision: 2,
  rpcUrl: 'https://mainnet.infura.io/v3/ca46d8be9c96443fa1f3bd92fc810abf',
  wsUrl: 'wss://mainnet.infura.io/ws/v3/ca46d8be9c96443fa1f3bd92fc810abf',
  subgraphUrl: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-beta',
  explorer: 'https://etherscan.io',
  addresses: {
    bFactory: '0x9424B1412450D0f8Fc2255FAf6046b98213B76Bd',
    bActions: '0x2FCc6f96418764439f8Dc26aF559Ed5CdDAeefaC',
    dsProxyRegistry: '0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4',
    proxy: '0x2633Dc6F65f293FdC47206beEf1FC9BD6C63edFF',
    crpFactory: '0xed52D8E202401645eDAD1c0AA21e872498ce47D0',
    weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    multicall: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441'
  },
  tokens: homesteadRegistry.tokens
}

export default { homestead } as EthConfigNetworks
