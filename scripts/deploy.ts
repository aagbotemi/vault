import { ethers } from "hardhat";

async function main() {
  const [signer1, signer2] = await ethers.getSigners();
  const VaultContract = await ethers.getContractFactory("Vault");
  const vault = await VaultContract.deploy();
  await vault.deployed();
  console.log("VaultContract deployed to:", vault.address);

  // -> the time limit was set to 2 seconds
  // const createGrantTxn = await vault.createGrant(signer2.address, 0, { value: ethers.utils.parseEther("0.01") });
  // const createGrantTxnReciept = await createGrantTxn.wait();
  // console.log("Create Grant Log: ", createGrantTxnReciept);
  // console.log("Waiting for 21 seconds before running withdraw function"); 
  
  // // -> To get beneficiary info
  // const beneficiaryInfoTxn = await vault.connect(signer2).returnBeneficiaryInfo(1);
  // // const beneficiaryInfoTxnReciept = await beneficiaryInfoTxn.wait(); // 'wait' does not exist on type Struct
  // console.log("Beneficiary Info Log: ", beneficiaryInfoTxn);

  // // -> To get the balance of the contract
  // const getContractBalanceTxn = await vault.connect(signer1).getBalance();
  // // const getContractBalanceTxnReciept = await getContractBalanceTxn.wait(); // 'wait' does not exist on type 'BigNumber'
  // console.log("Contract Balance Log: ", getContractBalanceTxn);


  // // -> get all beneficiary output
  // const getAllBeneficiaryTxn = await vault.connect(signer1).getAllBeneficiary();
  // // const getAllBeneficiaryTxnReciept = await getAllBeneficiaryTxn.wait(); // 'wait' does not exist on type Struct
  // console.log("Get all beneficiary Log: ", getAllBeneficiaryTxn);

  
  // // -> To get reverse the grant of a beneficiary
  // // -> NOTE: When grant has been reversed, the withdraw function in the setTimeout will fail with 'this beneficiary has no money!'
  // const reverseGrantTxn = await vault.connect(signer1).ReverseGrant(1);
  // const reverseGrantTxnReciept = await reverseGrantTxn.wait();
  // console.log("Reverse Grant Log: ", reverseGrantTxnReciept);

  // // -> this is to set 0.5 ethers so that the withdraw function will run successfully
  // const createGrantTxn2 = await vault.createGrant(signer2.address, 5, { value: ethers.utils.parseEther("0.01") });
  // const createGrantTxnReciept2 = await createGrantTxn2.wait();
  // console.log("Create Grant Log: ", createGrantTxnReciept2);

  // setTimeout(async() => {
  //   // -> withdraw function
  //   const withdrawGrantTxn = await vault.connect(signer2).withdraw(2);
  //   const withdrawGrantTxnReciept = await withdrawGrantTxn.wait();
  //   console.log("Withdraw Grant Log2: ", withdrawGrantTxnReciept);

  //   // -> To get beneficiary info at 1
  //   const beneficiaryInfoTxnn1 = await vault.connect(signer2).returnBeneficiaryInfo(1);
  //   console.log("Beneficiary Info Log: ", beneficiaryInfoTxnn1);

  //   // -> To get beneficiary info at 2
  //   const beneficiaryInfoTxnn2 = await vault.connect(signer2).returnBeneficiaryInfo(2);
  //   console.log("Beneficiary Info Log: ", beneficiaryInfoTxnn2);
  // }, 6000)


  // -> Waiting for 6 seconds before running withdraw in batch function
  // setTimeout(async() => {
  //   const withdrawInBatchGrantTxn = await vault.connect(signer2).withdrawInBatch(1, 0.10000000000000000);
  //   const withdrawInBatchGrantTxnReciept = await withdrawInBatchGrantTxn.wait();
  //   console.log("Withdraw In Batch Grant Log: ", withdrawInBatchGrantTxnReciept);
  // }, 6000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
