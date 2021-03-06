import { Signer } from "@ethersproject/abstract-signer";
import { Contract, ContractFactory } from "@ethersproject/contracts";
import { parseEther, formatEther } from "@ethersproject/units";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

let Token0: ContractFactory;
let Token1: ContractFactory;
let token0: Contract;
let token1: Contract;

let self: Signer;
let alex: Signer;
let beth: Signer;
let selfAddress: string;
let alexAddress: string;
let bethAddress: string;

const TOTAL_SUPPLY_STRING = "1984000000";
const TOTAL_SUPPLY = parseEther(TOTAL_SUPPLY_STRING);

const UPGRADED_SUPPLY_STRING = "100";
const UPGRADED_SUPPLY = parseEther(UPGRADED_SUPPLY_STRING);

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
        token1 = await upgrades.upgradeProxy(token0.address, Token1, {
            kind: "uups",
        });
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
    describe("after upgrade", async function () {
        beforeEach(async function () {
            await deployV0();
            await upgradeToV1(beth);
        });
        it("storage slots do no get overrwritten", async function () {
            await token1.updateStorage(
                "AOL.gg",
                "AOL",
                UPGRADED_SUPPLY,
                bethAddress
            );
            expect((await token1.totalSupply()).toString()).to.equal(
                TOTAL_SUPPLY.toString()
            );
            expect((await token1.name()).toString()).to.equal("AOL.gg");
            console.log("returned name changes", await token1.name());
            expect((await token1.symbol()).toString()).to.equal("AOL");
            expect((await token1.version()).toString()).to.equal("1");
            console.log("returned version changes", await token1.name());
        });
    });
});
