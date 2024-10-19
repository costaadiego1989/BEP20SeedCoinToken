import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("TheSeedCoin", function () {
  
  async function deployFixture() {

    const [owner, otherAccount] = await hre.ethers.getSigners();

    const TheSeedCoin = await hre.ethers.getContractFactory("TheSeedCoin");
    const theSeedCoin = await TheSeedCoin.deploy();

    return { theSeedCoin, owner, otherAccount };
  }

  describe("The Seeds Tests", () => {

    it("Should be a correct name", async () => {
      const { theSeedCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const name = await  theSeedCoin.name();
      expect(name).to.equal("The Seeds");
    });

    it("Should be a correct symbol", async () => {
      const { theSeedCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const symbol = await  theSeedCoin.symbol();
      expect(symbol).to.equal("SDS");
    });

    it("Should be a correct decimals", async () => {
      const { theSeedCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const decimals = await  theSeedCoin.decimals();
      expect(decimals).to.equal(18);
    });

    it("Should be a correct totalSupply", async () => {
      const { theSeedCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const totalSupply = await  theSeedCoin.totalSupply();
      expect(totalSupply).to.equal(1000000n * 10n ** 18n);
    });

    it("Should get a balance", async () => {
      const { theSeedCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balance = await theSeedCoin.balanceOf(owner.address);
      expect(balance).to.equal(1000000n * 10n ** 18n);
    });

    it("Should transfer", async () => {
      const { theSeedCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balanceOwnerBefore = await theSeedCoin.balanceOf(owner.address);
      const balanceOtherAccountBefore = await theSeedCoin.balanceOf(otherAccount.address);

      await theSeedCoin.transfer(otherAccount.address, 1n);

      const balanceOwnerAfter = await theSeedCoin.balanceOf(owner.address);
      const balanceOtherAccountrAfter = await theSeedCoin.balanceOf(otherAccount.address);

      expect(balanceOwnerBefore).to.equal(1000000n * 10n ** 18n);
      expect(balanceOwnerAfter).to.equal((1000000n * 10n ** 18n) - 1n);

      expect(balanceOtherAccountBefore).to.equal(0);
      expect(balanceOtherAccountrAfter).to.equal(1n);

    });

    it("Should NOT transfer", async () => {
      const { theSeedCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const instance = theSeedCoin.connect(otherAccount);
      await expect(instance.transfer(owner, 1n)).to.revertedWith("Insufficient balance");

    });

    it("Should approve", async () => {
      const { theSeedCoin, owner, otherAccount } = await loadFixture(deployFixture);
      await theSeedCoin.approve(otherAccount, 1n);
      const value = await theSeedCoin.allowance(owner, otherAccount);
      expect(value).to.equal(1n);

    });

    it("Should transfer from", async () => {
      const { theSeedCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balanceOwnerBefore = await theSeedCoin.balanceOf(owner.address);
      const balanceOtherAccountBefore = await theSeedCoin.balanceOf(otherAccount.address);

      await theSeedCoin.approve(otherAccount.address, 10n);

      const instance = theSeedCoin.connect(otherAccount);
      await instance.transferFrom(owner.address, otherAccount.address, 5n);

      const balanceOwnerAfter = await theSeedCoin.balanceOf(owner.address);
      const balanceOtherAccountrAfter = await theSeedCoin.balanceOf(otherAccount.address);

      const allowance = await theSeedCoin.allowance(owner.address, otherAccount.address);

      expect(balanceOwnerBefore).to.equal(1000000n * 10n ** 18n);
      expect(balanceOwnerAfter).to.equal((1000000n * 10n ** 18n) - 5n);

      expect(balanceOtherAccountBefore).to.equal(0);
      expect(balanceOtherAccountrAfter).to.equal(5n);

      expect(allowance).to.equal(5);

    });

    it("Should NOT transfer from (balance)", async () => {
      const { theSeedCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const instance = theSeedCoin.connect(otherAccount);
      await expect(instance.transferFrom(otherAccount.address, otherAccount.address, 1n)).to.revertedWith("Insufficient balance");

    });

    it("Should NOT transfer from (allowance)", async () => {
      const { theSeedCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const instance = theSeedCoin.connect(otherAccount);
      await expect(instance.transferFrom(owner.address, otherAccount.address, 1n)).to.revertedWith("Insufficient allowance");

    });

  });

});
