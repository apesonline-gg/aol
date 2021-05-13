import { parseEther } from "@ethersproject/units";
import { ethers, upgrades } from "hardhat";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

async function main() {
    const logicContractName = "AOLv0";
    const tokenName = "Apes Online";
    const tokenSymbol = "AOL";
    const owner = process.env.OWNER;
    const totalSupply = parseEther("1984000000");

    const Token = await ethers.getContractFactory(logicContractName);
    const proxy = await upgrades.deployProxy(
        Token,
        [tokenName, tokenSymbol, totalSupply, owner],
        { kind: "uups" }
    );
    const deployed = await proxy.deployed();
    console.log("Transaction hash:", deployed.deployTransaction.hash);
}

main()
    .then(() => {
        console.log("Done deploying proxy contract");
    })
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => {
        process.exit();
    });
