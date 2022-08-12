// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Vault.sol";

contract VaultFactory {
    Vault[] vaultAddress;

    event newClone(Vault indexed _addr, uint256 indexed length);

    function cloneVault() external returns(Vault NewV, uint _length) {
        NewV = new Vault();
        vaultAddress.push(NewV);

        _length = vaultAddress.length;
        emit newClone(NewV, _length);
    }

    function ClonedAddresses()
        external
        view
        returns (Vault[] memory _vault)
    {
        _vault = vaultAddress;
    }
}