import { task } from "hardhat/config";
import { accounts } from "./accounts"
import { balance } from "./balance"
import { node} from './node'
import { test_abi } from './test_abi'

task("node", "Start the local Conflux development node").setAction(node);

task("accounts", "Show the available accounts").setAction(accounts);

task("balance", "Show the balance for the configured networks").setAction(balance);

task("test-abi", "Show the available methods in the Lock contract")
  .addParam("artifact", "The artifact name")
  .addParam("address", "The address of the deployed Lock contract")
  .setAction(test_abi);