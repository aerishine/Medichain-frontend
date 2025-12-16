const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("Deploying Medichain contract...");

    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Medichain = await hre.ethers.getContractFactory("Medichain");

    // Deploy with the deployer as the initial owner
    const medichain = await Medichain.deploy(deployer.address);

    await medichain.waitForDeployment();

    const address = await medichain.getAddress();

    console.log("Medichain deployed to:", address);

    // Create config file for frontend
    const configDir = path.join(__dirname, "../config");
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    // We need the ABI. 
    // Hardhat automatically generates artifacts/contracts/Medichain.sol/Medichain.json
    const artifactPath = path.join(__dirname, "../artifacts/contracts/Medichain.sol/Medichain.json");
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    const configFileContent = `
export const MEDICHAIN_ADDRESS = "${address}";
export const MEDICHAIN_ABI = ${JSON.stringify(artifact.abi, null, 2)} as const;
`;

    fs.writeFileSync(path.join(configDir, "contracts.ts"), configFileContent);
    console.log("Frontend config updated at config/contracts.ts");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
