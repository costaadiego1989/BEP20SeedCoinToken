import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("SpiritCoin", function () {
  
  async function deployFixture() {

    const [owner, otherAccount] = await hre.ethers.getSigners();

    const SpiritCoin = await hre.ethers.getContractFactory("SpiritCoin");
    const spiritCoin = await SpiritCoin.deploy();

    return { spiritCoin, owner, otherAccount };
  }

  describe("Spirit Coin Tests", () => {

    it("Should be a correct name", async () => {
      const { spiritCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const name = await  spiritCoin.name();
      expect(name).to.equal("Spirit Coin");
    });

    it("Should be a correct symbol", async () => {
      const { spiritCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const symbol = await  spiritCoin.symbol();
      expect(symbol).to.equal("SPT");
    });

    it("Should be a correct decimals", async () => {
      const { spiritCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const decimals = await  spiritCoin.decimals();
      expect(decimals).to.equal(18);
    });

    it("Should be a correct totalSupply", async () => {
      const { spiritCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const totalSupply = await  spiritCoin.totalSupply();
      expect(totalSupply).to.equal(1000000n * 10n ** 18n);
    });

  });

});
