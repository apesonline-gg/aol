import { ethers } from "hardhat";

async function main() {
    const contractName = "AOLv0";

    const Token = await ethers.getContractFactory(contractName);
    const token = await Token.deploy();
    const deployed = await token.deployed();
    console.log("Transaction hash:", deployed.deployTransaction.hash);
}

main()
    .then(() => {
        console.log("Done deploy logic contract");
    })
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => {
        process.exit();
    });
