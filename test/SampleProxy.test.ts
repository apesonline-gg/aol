import { Contract, ContractFactory } from "@ethersproject/contracts";
import { getManifestAdmin } from "@openzeppelin/hardhat-upgrades/dist/admin";
import { expect } from "chai";
import hre, { ethers, upgrades } from "hardhat";

let proxyAdmin: Contract;
let SampleLogic0: ContractFactory;
let sampleLogic0Address: string;
let SampleLogic1: ContractFactory;
let sampleLogic1Address: string;
let sampleProxy: Contract;
let sampleProxyUpgrade: Contract;

describe("SampleProxy", function () {
    beforeEach(async function () {
        SampleLogic0 = await ethers.getContractFactory("SampleLogic0");
        SampleLogic1 = await ethers.getContractFactory("SampleLogic1");
        sampleProxy = await upgrades.deployProxy(SampleLogic0, [42]);
        await sampleProxy.deployed();
        proxyAdmin = await getManifestAdmin(hre);
        sampleLogic0Address = await proxyAdmin.getProxyImplementation(
            sampleProxy.address
        );
    });

    it("retrieve returns a value previously initialized", async function () {
        expect((await sampleProxy.name()).toString()).to.equal("SampleLogic0");
        expect((await sampleProxy.retrieve()).toString()).to.equal("42");
    });

    describe("when upgraded", function () {
        beforeEach(async function () {
            sampleProxyUpgrade = await upgrades.upgradeProxy(
                sampleProxy.address,
                SampleLogic1
            );
            sampleLogic1Address = await proxyAdmin.getProxyImplementation(
                sampleProxyUpgrade.address
            );
        });
        it("keeps the same proxy address", async function () {
            expect(sampleProxy.address).to.equal(sampleProxyUpgrade.address);
        });
        it("changes implementation address", async function () {
            expect(sampleLogic0Address).to.not.equal(sampleLogic1Address);
        });
        it("retrieve returns a value previously initialized", async function () {
            expect((await sampleProxyUpgrade.retrieve()).toString()).to.equal(
                "42"
            );
        });
        it("initialize changes storage values", async function () {
            await sampleProxyUpgrade.initialize(42);
            expect((await sampleProxyUpgrade.name()).toString()).to.equal(
                "SampleLogic1"
            );
            expect((await sampleProxyUpgrade.retrieve()).toString()).to.equal(
                "84"
            );
        });
    });
});
