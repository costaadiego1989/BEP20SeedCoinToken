// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TheSeedCoin = buildModule("TheSeedCoin", (m) => {
  const theSeedCoin = m.contract("TheSeedCoin", [], { });

  return { theSeedCoin };
});

export default TheSeedCoin;
