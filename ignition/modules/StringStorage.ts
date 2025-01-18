// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEFAULT_INITIAL_STRING = "Hello, Conflux!";

const StringStorageModule = buildModule("StringStorageModule", (m) => {
  const initialString = m.getParameter("initialString", DEFAULT_INITIAL_STRING);

  const stringStorage = m.contract("StringStorage", [initialString]);

  return { stringStorage };
});

export default StringStorageModule; 