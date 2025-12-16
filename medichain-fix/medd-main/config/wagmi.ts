import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { liskSepolia } from 'wagmi/chains';
import { defineChain } from 'viem';

const localHardhat = defineChain({
    id: 31337,
    name: 'Local Hardhat',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['http://127.0.0.1:8546'] },
    },
})

export const config = getDefaultConfig({
    appName: 'MediChain',
    projectId: 'YOUR_PROJECT_ID', // Get one at https://cloud.walletconnect.com
    chains: [liskSepolia, localHardhat],
    ssr: true,
});
