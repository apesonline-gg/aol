import { Signer } from "@ethersproject/abstract-signer";
import { Contract, ContractFactory } from "@ethersproject/contracts";
import { parseEther } from "@ethersproject/units";
import { expect } from "chai";
import { ethers } from "hardhat";

import { DEFAULT_ADMIN_ROLE, MINTER_ROLE, PAUSER_ROLE } from "./helpers/constants";

let Token: ContractFactory;
let token: Contract;

let self: Signer;
let alex: Signer;
let beth: Signer;
let selfAddress: string;
let alexAddress: string;
let bethAddress: string;

const TOTAL_SUPPLY_STRING = "1984000000";
const TOTAL_SUPPLY = parseEther(TOTAL_SUPPLY_STRING);

describe("SampleERC20MinterPauser token", function () {
    before(async function() {
        [self, alex, beth] = await ethers.getSigners();
        selfAddress = await self.getAddress();
        alexAddress = await alex.getAddress();
        bethAddress = await beth.getAddress();
    });

    beforeEach(async function () {
        Token = await ethers.getContractFactory("SampleERC20MinterPauser");
        token = await Token.deploy();
        await token.deployed();
    });

    describe("initialize", async function() {
        beforeEach(async function() {
            await token.initialize("Apes Online", "AOL");
        });
        it("sets name, symbol, and version", async function () {
            expect((await token.name()).toString()).to.equal("Apes Online");
            expect((await token.symbol()).toString()).to.equal("AOL");
            expect((await token.version()).toString()).to.equal("0");
        });
        it("starts total supply at 0", async function() {
            expect((await token.totalSupply()).toString()).to.equal("0");
        });
        it("sets roles to deployer", async function() {
            expect(await token.hasRole(DEFAULT_ADMIN_ROLE, selfAddress)).to.be.true;
            expect(await token.getRoleAdmin(DEFAULT_ADMIN_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
            expect(await token.getRoleAdmin(MINTER_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
            expect(await token.getRoleAdmin(PAUSER_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
            expect(await token.hasRole(MINTER_ROLE, selfAddress)).to.be.true;
            expect(await token.hasRole(PAUSER_ROLE, selfAddress)).to.be.true;
        });
        it("allows deployer to grant roles", async function() {
            await token.grantRole(MINTER_ROLE, alexAddress);
            await token.grantRole(PAUSER_ROLE, bethAddress);
        });
    });
});
