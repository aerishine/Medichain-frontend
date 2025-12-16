const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
    const targetAddress = "0xB34ed1687e400087207F1805c1f3d6939f31111F";
    console.log(`Reading contract at ${targetAddress}...`);

    // Connect to local node
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8546");

    // Load ABI
    const artifactPath = path.join(__dirname, "../artifacts/contracts/Medichain.sol/Medichain.json");
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    const contract = new ethers.Contract(targetAddress, artifact.abi, provider);

    try {
        const owner = await contract.owner();
        console.log("Owner:", owner);

        const medicines = await contract.getAllMedicines();
        console.log("Registered Medicines Count:", medicines.length);
        console.log("Medicines:", medicines);

    } catch (error) {
        console.error("Error reading contract:", error.message);
        console.log("Note: If looking for a different network, this script is only checking Localhost 8546.");
    }
}

main().catch(console.error);
