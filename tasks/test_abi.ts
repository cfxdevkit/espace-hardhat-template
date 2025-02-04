import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getPublicClient } from "./utils";
import { Address, getContract } from "viem";

export async function test_abi(
  args: { artifact: string, address?: string },
  hre: HardhatRuntimeEnvironment
) {
  const artifact = await hre.artifacts.readArtifact(args.artifact);
  const abi = artifact.abi;
  
  if (!args.artifact) {
    console.log("Please provide a contract artifact using --artifact flag");
    return;
  }
  
  if (!args.address) {
    console.log("Please provide a contract address using --address flag");
    return;
  }

  // Ensure address is properly formatted
  const contractAddress = args.address as Address;

  console.log(`Available methods in ${args.artifact} contract:`);
  console.log("-----------------------------------");
  
  try {
    // Get deployed contract instance
    const publicClient = await getPublicClient(hre);
    const Contract = getContract({
      address: contractAddress,
      abi: abi,
      client: publicClient
    });
    
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
            //@ts-ignore
            const result = await Contract.read[item.name as keyof typeof Contract.read]();
            console.log(`Current value: ${result}`);
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
