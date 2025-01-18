import { HardhatRuntimeEnvironment } from "hardhat/types";
import LockArtifact from "../artifacts/contracts/Lock.sol/Lock.json";
import { getPublicClient } from "./utils";
import { formatEther, Address } from "viem";

export async function test_abi(
  args: { address?: string },
  hre: HardhatRuntimeEnvironment
) {
  const publicClient = await getPublicClient(hre);
  const abi = LockArtifact.abi;
  
  if (!args.address) {
    console.log("Please provide a contract address using --address flag");
    return;
  }

  // Ensure address is properly formatted
  const contractAddress = args.address as Address;

  console.log("Available methods in Lock contract:");
  console.log("-----------------------------------");
  
  try {
    // Get deployed contract instance
    const Lock = await hre.viem.getContractAt("Lock", contractAddress);
    
    // Filter and display functions from the ABI
    for (const item of abi) {
      if (item.type === "function") {
        const inputs = item.inputs?.map((input: any) => `${input.type} ${input.name}`).join(", ") || "";
        const outputs = item.outputs?.map((output: any) => output.type).join(", ") || "void";
        console.log(`${item.name}(${inputs}) -> ${outputs}`);
        console.log(`Mutability: ${item.stateMutability}`);
        
        // Call view methods
        if (item.stateMutability === "view") {
          try {
            const result = await Lock.read[item.name as keyof typeof Lock.read]();
            if (typeof result === 'bigint') {
              console.log(`Current value: ${formatEther(result)} CFX`);
            } else {
              console.log(`Current value: ${result}`);
            }
          } catch (error: any) {
            console.log(`Error reading ${item.name}: ${error?.message || 'Unknown error'}`);
          }
        }
        console.log("-----------------------------------");
      }
    }
  } catch (error: any) {
    console.error("Error accessing contract:", error?.message || 'Unknown error');
  }
} 