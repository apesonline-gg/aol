import { parseEther } from "@ethersproject/units";
import { ethers, upgrades } from "hardhat";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

/**
 * Gas estimates
 * Logic: 3,055,681
 * Proxy: 399,028
 *
 * Sum: 3454709 * 135 = 0.466385715 ETH
 *
 * Upgraded logic: 2,385,604
 */

async function main() {
    const proxyKind = "uups";
    const logicContractName = "MODEMv0";
    const tokenName = "Modem";
    const tokenSymbol = "MODEM";
    const totalSupply = parseEther("56000");
    const owner = "0x0478c5B8ec412aCb666568a9D14f78Af6C4Aeaa9";

    console.log(
        `Deploying Modem upgradedable contract`,
        `=> kind: ${proxyKind}`,
        `=> logic contract: ${logicContractName}`,
        `=> logic params:`,
        `    => token name: ${tokenName}`,
        `    => token symbol: ${tokenSymbol}`,
        `    => total supply: ${totalSupply.toString()}`,
        `    => owner: ${owner}`,
    );

    const Token = await ethers.getContractFactory(logicContractName);
    const proxy = await upgrades.deployProxy(
        Token,
        [tokenName, tokenSymbol, totalSupply, owner],
        { kind: proxyKind }
    );
    console.log("Proxy:", proxy);
    const deployed = await proxy.deployed();
    console.log("Transaction hash:", deployed.deployTransaction.hash);
}

main()
    .then(() => {
        console.log("Done deploying Modem");
    })
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => {
        process.exit();
    });
