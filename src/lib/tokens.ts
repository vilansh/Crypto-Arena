// src/lib/tokens.ts
import ERC20ABI from "../abis/ERC20.json";
import ExchangeABI from "../abis/CryptoArenaExchange.json";

// Token addresses on Sepolia
export const TOKENS = {
  BTC: {
    address: "0xE7eeCAC4cfe2F73f7aA794e8bF6719D671146b85",
    symbol: "BTC",
    name: "MockBTC",
    decimals: 18,
    abi: ERC20ABI,
  },
  DOGE: {
    address: "0xe88fba437A74D5690Fb89775b86e49103Df7526e",
    symbol: "DOGE",
    name: "MockDOGE",
    decimals: 18,
    abi: ERC20ABI,
  },
  ETH: {
    address: "0x349eB8Bf06Aa2ce6BA4566dF869B4B4711aA9329",
    symbol: "ETH",
    name: "MockETH",
    decimals: 18,
    abi: ERC20ABI,
  },
  SHIB: {
    address: "0x00D34db8Cd945B28b25431ef18Bc8223C76a316c",
    symbol: "SHIB",
    name: "MockSHIB",
    decimals: 18,
    abi: ERC20ABI,
  },
};

export const EXCHANGE = {
  address: "0x212F9E219CF82d1aE32A33DEac382Bc12EA6607D",
  abi: ExchangeABI,
};