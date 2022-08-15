require("dotenv").config({ path: ".env" });
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers,  } from "hardhat";
import { BigNumber, BytesLike } from "ethers";
// require("@nomiclabs/hardhat-waffle");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployVault() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, user1, user2] = await ethers.getSigners();

    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy();

    // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    return { vault, owner, user1, user2 };
  }

  describe("Deployment", function () {
    // it("Should check name of vault", async () => {
    //     const { vault, owner } = await loadFixture(deployVault);
        
    //     const vaulName = (await vault.name()).toString();
    //     console.log("Vault LP name", vaulName);
    //     expect(vaulName).to.be.equal("eth-usdt");
    // });

    it("Should set the right owner", async function () {
      const { vault, owner } = await loadFixture(deployVault);

      expect(await vault.owner()).to.equal(owner.address);
    });

    // it("Should set the right unlockTime", async function () {
    //   const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

    //   expect(await lock.unlockTime()).to.equal(unlockTime);
    // });


    it("Should receive and store the funds into the contract", async function () {
      const { vault, owner } = await loadFixture(
        deployVault
      );

      await owner.sendTransaction({
        to: vault.address,
        value: ethers.utils.parseEther("10"), // Sends exactly 10 ether
      });

      expect(await ethers.provider.getBalance(vault.address)).to.equal(10000000000000000000n);
    });


    
    // it("Should fail if the unlockTime is not in the future", async function () {
      //   // We don't use the fixture here because we want a different deployment
      //   const latestTime = await time.latest();
      //   const Lock = await ethers.getContractFactory("Lock");
    //   await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //     "Unlock time should be in the future"
    //   );
    // });
  });

  describe("Create Grant", function () {
    it("Should revert with the right error if zero ether is passed", async function () {
      const { vault, owner } = await loadFixture(deployVault);

      await expect(vault.createGrant(owner.address, 2, { value: ethers.utils.parseEther("0") })).to.be.revertedWith(
        "zero ether not allowed!"
      );
    });

    it("Should ensure the deployer of the contract is the owner", async () => {
      const { vault, owner, user1 } = await loadFixture(
        deployVault
      );

      expect(await vault.owner()).to.equal(owner.address);
    });

    // it("Should be reverted if deployer of the contract is compared with wrong address", async () => {
    //   const { vault, owner, user1 } = await loadFixture(
    //     deployVault
    //   );

    //   await expect(user1.address).to.be.revertedWith("not owner");
    //   expect(await vault.owner()).to.equal(user1.address).to.be.rejectedWith("not owner");
    // });

//     const sevenDays = 7 * 24 * 60 * 60;

// const blockNumBefore = await ethers.provider.getBlockNumber();
// const blockBefore = await ethers.provider.getBlock(blockNumBefore);
// const timestampBefore = blockBefore.timestamp;

// await ethers.provider.send('evm_increaseTime', [sevenDays]);
// await ethers.provider.send('evm_mine');

// const blockNumAfter = await ethers.provider.getBlockNumber();
// const blockAfter = await ethers.provider.getBlock(blockNumAfter);
// const timestampAfter = blockAfter.timestamp;

// expect(blockNumAfter).to.be.equal(blockNumBefore + 1);
// expect(timestampAfter).to.be.equal(timestampBefore + sevenDays);


  //   describe("Validations", function () {

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
    });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
