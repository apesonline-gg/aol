import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const AOLDeployerSK = process.env.AOL_DEPLOYER_PRIVATE_KEY || "";
const infuraRinkebyUrl = process.env.INFURA_RINKEBY_URL || "";
const infuraMainnetUrl = process.env.INFURA_MAINNET_URL || "";

const config: HardhatUserConfig = {
  solidity: "0.8.2",
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS == "true"
  },
  networks: {
    mainnet: {
      url: infuraMainnetUrl,
      accounts: [AOLDeployerSK],
      gasPrice: 150000000000
    },
    rinkeby: {
      url: infuraRinkebyUrl,
      accounts: [AOLDeployerSK],
      gasPrice: 150000000000
    }
  }
}

export default config;
