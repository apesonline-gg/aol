import { parseEther } from "@ethersproject/units";
import { ethers, upgrades } from "hardhat";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

async function main() {
    const proxyKind = "uups";
    const logicContractName = "AOLv0";
    const tokenName = "Apes Online";
    const tokenSymbol = "AOL";
    const totalSupply = parseEther("1984000000");
    const owner = process.env.OWNER;

    console.log(
        `Deploying AOL upgradedable contract`,
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
        console.log("Done deploying AOL");
    })
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => {
        process.exit();
    });
