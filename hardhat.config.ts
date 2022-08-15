import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
// require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

type HttpNetworkAccountsUserConfig = any;
type HardhatNetworkForkingUserConfig = any;

// 0x5ca719Dbc48488A67be9ec81C9f67AdcAe4614c4

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    // hardhat: {
    //   forking: {
    //     blockNumber: 123465434,
    //     url: process.env.GOERLI_URL as HardhatNetworkForkingUserConfig | undefined
    //   }
    // },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY_1] as HttpNetworkAccountsUserConfig | undefined
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2] as HttpNetworkAccountsUserConfig | undefined
    }
  },
  // gasReporter: {
  //   enabled: process.env.REPORT_GAS !== undefined,
  //   currency: "USD"
  // },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};

export default config;
