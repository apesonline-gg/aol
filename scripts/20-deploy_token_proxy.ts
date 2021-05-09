import { ethers, upgrades } from "hardhat";

async function main() {
    const Token = await ethers.getContractFactory("AolLogic0");
    const proxy = await upgrades.deployProxy(Token, ["Apes Online", "AOL"]);
    await proxy.deployed();
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
