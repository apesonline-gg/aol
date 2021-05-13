import { Signer } from "@ethersproject/abstract-signer";
import { Contract, ContractFactory } from "@ethersproject/contracts";
import { parseEther, formatEther } from "@ethersproject/units";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

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

const TOTAL_SUPPLY_STRING = "1984000000";
const TOTAL_SUPPLY = parseEther(TOTAL_SUPPLY_STRING);

describe("AOL UUPS", function () {
    before(async function () {
        [self, alex, beth] = await ethers.getSigners();
        selfAddress = await self.getAddress();
        alexAddress = await alex.getAddress();
        bethAddress = await beth.getAddress();
    });

    async function deployV0() {
        Token0 = await ethers.getContractFactory("AOLv0");
        token0 = await upgrades.deployProxy(
            Token0,
            ["Apes Online", "AOL", TOTAL_SUPPLY, bethAddress],
            { kind: "uups" }
        );
        await token0.deployed();
    }

    async function upgradeToV1(signer: Signer) {
        Token1 = await ethers.getContractFactory("SampleAOLv1", signer);
        token0 = await upgrades.upgradeProxy(token0.address, Token1);
    }

    describe("after deploying proxy", async function () {
        beforeEach(async function () {
            await deployV0();
        });
        it("sets name, symbol, and version", async function () {
            expect((await token0.name()).toString()).to.equal("Apes Online");
            expect((await token0.symbol()).toString()).to.equal("AOL");
            expect((await token0.version()).toString()).to.equal("0");
        });
        it("starts total supply at 1.984 B", async function () {
            expect((await token0.totalSupply()).toString()).to.equal(
                TOTAL_SUPPLY.toString()
            );
        });
        it("sets owner", async function () {
            expect((await token0.owner()).toString()).to.equal(bethAddress);
        });
        it("owner has tokens", async function () {
            expect((await token0.balanceOf(bethAddress)).toString()).to.equal(
                TOTAL_SUPPLY.toString()
            );
        });
        it("only owner can upgrade", async function () {
            try {
                await upgradeToV1(self);
            } catch (error) {
                const errorMessage = error.message;
                expect(
                    errorMessage.includes("Ownable: caller is not the owner")
                ).to.be.true;
            }
            await upgradeToV1(beth);
        });
    });
});
