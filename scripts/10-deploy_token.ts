import { ethers } from "hardhat";

async function main() {
    const tokenContractName = process.env.TOKEN_CONTRACT_NAME || "";

    console.log(
        `Deploying Token contract`,
        `=> token contract name: ${tokenContractName}`
    );

    const Token = await ethers.getContractFactory(tokenContractName);
    const token = await Token.deploy();
    console.log("Token:", token);
    const deployed = await token.deployed();
    console.log("Transaction hash:", deployed.deployTransaction.hash);
}

main()
    .then(() => {
        console.log("Done deploying Token");
    })
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => {
        process.exit();
    });
