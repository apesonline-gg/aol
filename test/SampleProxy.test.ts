import { Contract, ContractFactory } from "@ethersproject/contracts";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

let SampleLogic: ContractFactory;
let sampleProxy: Contract;

describe("SampleProxy", function () {
    beforeEach(async function () {
        SampleLogic = await ethers.getContractFactory("SampleLogic0");
        sampleProxy = await upgrades.deployProxy(SampleLogic, [42], {
            initializer: "store",
        });
        await sampleProxy.deployed();
    });

    it("retrieve returns a value previously initialized", async function () {
        expect((await sampleProxy.retrieve()).toString()).to.equal("42");
    });
});
