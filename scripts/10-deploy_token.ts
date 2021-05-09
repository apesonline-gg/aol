import { ethers } from "hardhat";

async function main() {
    const Token = await ethers.getContractFactory("AolLogic0");
    const token = await Token.deploy();
    await token.deployed();
    // TODO: Log tx info and token address
}

main()
    .then(() => {
        console.log("Done");
    })
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => {
        process.exit();
    });
