const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
    // Connect to local node
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8546");

    // Use the first account from the node (Hardhat default)
    const signer = await provider.getSigner(0);
    console.log("Deploying with account:", await signer.getAddress());

    // Load ABI/Bytecode
    const artifactPath = path.join(__dirname, "../artifacts/contracts/Medichain.sol/Medichain.json");
    if (!fs.existsSync(artifactPath)) {
        console.error("Artifact not found! Run 'npx hardhat compile' first.");
        process.exit(1);
    }
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    // Deploy
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
    const contract = await factory.deploy(await signer.getAddress());
    await contract.waitForDeployment(); // New ethers v6 syntax? or deployed() for v5
    // If v6: await contract.waitForDeployment();
    // If v5: await contract.deployed();

    // Try v6 first (ethers was just installed)
    let address;
    try {
        address = await contract.getAddress();
    } catch (e) {
        address = contract.address; // Fallback for v5
    }

    console.log("Medichain deployed to:", address);

    // Update Frontend Config
    const configDir = path.join(__dirname, "../config");
    const configFileContent = `
export const MEDICHAIN_ADDRESS = "${address}";
export const MEDICHAIN_ABI = ${JSON.stringify(artifact.abi, null, 2)} as const;
`;

    fs.writeFileSync(path.join(configDir, "contracts.ts"), configFileContent);
    console.log("Updated config/contracts.ts");
}

main().catch(console.error);
