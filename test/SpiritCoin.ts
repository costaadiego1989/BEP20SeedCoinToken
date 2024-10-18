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

  describe("", () => {

  });

})
