import { Contract, ContractFactory } from "@ethersproject/contracts";
import { expect } from "chai";
import { ethers } from "hardhat";

let SampleLogic: ContractFactory;
let sampleLogic: Contract;

describe("SampleLogic", function () {
    beforeEach(async function () {
        SampleLogic = await ethers.getContractFactory("SampleLogic0");
        sampleLogic = await SampleLogic.deploy();
        await sampleLogic.deployed();
    });

    it("retrieve returns a value previously stored", async function () {
        await sampleLogic.initialize(42);
        expect((await sampleLogic.retrieve()).toString()).to.equal("42");
    });
});
