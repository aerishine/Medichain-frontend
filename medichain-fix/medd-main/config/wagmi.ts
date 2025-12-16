import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { liskSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'MediChain',
    projectId: 'YOUR_PROJECT_ID', // Get one at https://cloud.walletconnect.com
    chains: [liskSepolia],
    ssr: true,
});
