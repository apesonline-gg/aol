import { Contract, ContractFactory } from "@ethersproject/contracts";
import { expect } from "chai";
import { ethers } from "hardhat";

let Token: ContractFactory;
let token: Contract;

describe("AOLv0 token", function () {
    beforeEach(async function () {
        Token = await ethers.getContractFactory("AOLv0");
        token = await Token.deploy();
        await token.deployed();
    });

    it("retrieve returns a value previously stored", async function () {
        await token.initialize("Apes Online", "AOL");
        expect((await token.name()).toString()).to.equal("Apes Online");
        expect((await token.symbol()).toString()).to.equal("AOL");
    });
});
