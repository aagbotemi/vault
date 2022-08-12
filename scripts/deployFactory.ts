import { ethers } from "hardhat";

async function main() {
    const [signer1, signer2, signer3, signer4, signer5] = await ethers.getSigners();
    const VaultFactoryContract = await ethers.getContractFactory("VaultFactory");
    const vaultFactory = await VaultFactoryContract.deploy();
    await vaultFactory.deployed();
    console.log("VaultFactoryContract deployed to:", vaultFactory.address);

  
    let clone1 = await vaultFactory.cloneVault();
    let cloned1Result = (await clone1.wait());
    console.log("factory 1 cloned successfully: ", cloned1Result);


    console.log("////////////////////////////////////////////////////////");


    let clonedAddr = await vaultFactory.ClonedAddresses();
    let clonedAddr1Result = await clonedAddr.wait().toString();
    console.log("factory 1 cloned Address successfully: ", clonedAddr1Result);


    console.log("////////////////////////////////////////////////////////");


    const clone2 = await vaultFactory.connect(signer2).cloneVault();
    let cloned2Result = (await clone2.wait());
    console.log("factory 2 cloned successfully: ", cloned2Result);


    console.log("////////////////////////////////////////////////////////");
    

    let clonedAddr2 = await vaultFactory.ClonedAddresses();
    let clonedAddr2Result = await clonedAddr2.wait().toString();
    console.log("factory 2 cloned Address successfully: ", clonedAddr2Result);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
