import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomiclabs/hardhat-waffle'

import '@openzeppelin/hardhat-upgrades'
import "hardhat-gas-reporter"

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

const config: HardhatUserConfig = {
  solidity: "0.8.2",
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS == "true"
  }
}

export default config
