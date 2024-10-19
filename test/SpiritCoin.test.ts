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

    it("Should get a balance", async () => {
      const { spiritCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balance = await spiritCoin.balanceOf(owner.address);
      expect(balance).to.equal(1000000n * 10n ** 18n);
    });

    it("Should transfer", async () => {
      const { spiritCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balanceOwnerBefore = await spiritCoin.balanceOf(owner.address);
      const balanceOtherAccountBefore = await spiritCoin.balanceOf(otherAccount.address);

      await spiritCoin.transfer(otherAccount.address, 1n);

      const balanceOwnerAfter = await spiritCoin.balanceOf(owner.address);
      const balanceOtherAccountrAfter = await spiritCoin.balanceOf(otherAccount.address);

      expect(balanceOwnerBefore).to.equal(1000000n * 10n ** 18n);
      expect(balanceOwnerAfter).to.equal((1000000n * 10n ** 18n) - 1n);

      expect(balanceOtherAccountBefore).to.equal(0);
      expect(balanceOtherAccountrAfter).to.equal(1n);

    });

  });

});
