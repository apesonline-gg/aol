import { Signer } from "@ethersproject/abstract-signer";
import { Contract, ContractFactory } from "@ethersproject/contracts";
import { getManifestAdmin } from "@openzeppelin/hardhat-upgrades/dist/admin";
import { expect } from "chai";
import hre, { ethers, upgrades } from "hardhat";

import {
    DEFAULT_ADMIN_ROLE,
    MINTER_ROLE,
    PAUSER_ROLE,
} from "./helpers/constants";

let Token0: ContractFactory;
let Token1: ContractFactory;
let token0: Contract;
let token1: Contract;
let proxy: Contract;
let proxyAdmin: Contract;

let self: Signer;
let alex: Signer;
let beth: Signer;
let selfAddress: string;
let alexAddress: string;
let bethAddress: string;

describe("AOL Transparent Proxy", function () {
    before(async function () {
        proxyAdmin = await getManifestAdmin(hre);
        await deployV0();
        [self, alex, beth] = await ethers.getSigners();
        selfAddress = await self.getAddress();
        alexAddress = await alex.getAddress();
        bethAddress = await beth.getAddress();
    });

    async function deployV0() {
        Token0 = await ethers.getContractFactory("AOLv0");
        proxy = await upgrades.deployProxy(Token0, ["Apes Online", "AOL"]);
        await proxy.deployed();
    }

    async function upgradeToFixedSupplyToken() {
        Token1 = await ethers.getContractFactory("SampleFixedSupplyToken");
        proxy = await upgrades.upgradeProxy(proxy.address, Token1);
    }

    it("initializes the AOL ERC20", async function () {
        expect(await proxy.name()).to.equal("Apes Online");
        expect(await proxy.symbol()).to.equal("AOL");
        expect((await proxy.version()).toString()).to.equal("0");
    });
    describe("initial implementation", async function () {
        it("starts total supply at 0", async function () {
            expect((await proxy.totalSupply()).toString()).to.equal("0");
        });
        it("sets roles to deployer", async function () {
            expect(await proxy.hasRole(DEFAULT_ADMIN_ROLE, selfAddress)).to.be
                .true;
            expect(await proxy.hasRole(MINTER_ROLE, selfAddress)).to.be.true;
            expect(await proxy.hasRole(PAUSER_ROLE, selfAddress)).to.be.true;
            expect(await proxy.getRoleAdmin(DEFAULT_ADMIN_ROLE)).to.equal(
                DEFAULT_ADMIN_ROLE
            );
            expect(await proxy.getRoleAdmin(MINTER_ROLE)).to.equal(
                DEFAULT_ADMIN_ROLE
            );
            expect(await proxy.getRoleAdmin(PAUSER_ROLE)).to.equal(
                DEFAULT_ADMIN_ROLE
            );
        });
    });
    it("can not be upgraded to fixed supply ERC20", async function () {
        let error = "";
        try {
            await upgradeToFixedSupplyToken();
        } catch (_error) {
            error = _error.message;
        }
        expect(error.includes("storage layout is incompatible")).to.be.true;
    });
});
