import { HardhatRuntimeEnvironment } from "hardhat/types";
import { defineChain } from 'viem'

function devChain(hre: HardhatRuntimeEnvironment) {
    //NOTE: this should be supported directly without the need of defining the devCahin, see:
    // https://github.com/NomicFoundation/hardhat/issues/4599
    // https://github.com/NomicFoundation/hardhat/pull/4602
    // Didn't find any additional details to avoid this workaround
    const devChain = defineChain({
        id: hre.network.config.chainId!,
        name: hre.network.name,
        rpcUrls: {
            default: { http: [hre.network.config.url] },
        },
        nativeCurrency: {
            name: 'Conflux',
            symbol: 'CFX',
            decimals: 18,
        },
    });
    return devChain
}


export async function getWalletClients(hre: HardhatRuntimeEnvironment) {
    let clients
    try {
        clients = await hre.viem.getWalletClients();
    } catch (error) {
        clients = await hre.viem.getWalletClients({ chain: devChain(hre) });
    } finally {
        return clients
    }
}


export async function getPublicClient(hre: HardhatRuntimeEnvironment) {
    let publicClient: any
    try {
        publicClient = await hre.viem.getPublicClient();
    } catch (error) {
        publicClient = await hre.viem.getPublicClient({ chain: devChain(hre) });
    } finally {
        return publicClient
    }
}