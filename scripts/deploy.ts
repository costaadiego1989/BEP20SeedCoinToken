import { ethers } from "hardhat";

async function main() {
    
    const seed = await ethers.deployContract("TheSeedCoin");

    await seed.waitForDeployment();

    console.log("Contract deployed: ", seed.target);

}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
    
});