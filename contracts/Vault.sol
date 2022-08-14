// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Vault {
    // a contract where the owner create grant for a beneficiary;
    // allows beneficiary to withdraw only when time elapsed
    // allows owner to withdraw before the time elapsed
    // get information of the beneficiary
    // amount of ethers in the smart contract


    //*********** state variable **************//
    address public owner;

    enum Status {
        GRANT_GIVEN,
        GRANT_WITHDRAWN,
        GRANT_PARTLY_WITHDRAWN
    }

    struct BeneficiaryProperties {
        uint256 amountAllocated;
        uint256 time;
        address beneficiary;
        Status status;
    }

    event CreatedWithdrawnGrant(address indexed _address, uint256 _amount, uint256 timestamp);

    uint256 ID = 1;

    uint256[] id;
    // BeneficiaryProperties[] bp;

    // the uint256 serves as id
    mapping(uint256 => BeneficiaryProperties) public _beneficiaryProperties;

    // only owner modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    // time elapsed modifier
    modifier hasTimeElapsed(uint256 _id) {
        // memory is used to reduce the gas, since we are only reading from storage.
        BeneficiaryProperties memory BP = _beneficiaryProperties[_id];
        require(BP.time <= block.timestamp, "time never reach");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // we want to return 
    function createGrant(address _beneficiary, uint256 _time) external payable onlyOwner returns(uint256) {

        // checkIfBeneficiaryExist(ID, _beneficiary); // check is not working

        require(msg.value > 0, "zero ether not allowed!");
        BeneficiaryProperties storage BP = _beneficiaryProperties[ID];

      
        BP.amountAllocated = msg.value;
        BP.beneficiary = _beneficiary;
        BP.time = _time + block.timestamp;
        // BP.time = _time;

        uint256 _id = ID; // this is the current ID assigned to _id so that it can be returned to the frontend before incrementing it.

        id.push(_id);

        // bp.push(BP);

        ID++; // increments the ID

        BP.status = Status.GRANT_GIVEN;

        emit CreatedWithdrawnGrant(_beneficiary, msg.value, block.timestamp);

        return ID; // returned id;
    }

    // function checkIfBeneficiaryExist(uint256 _id, address _addr) internal view {
    //     BeneficiaryProperties storage BP = _beneficiaryProperties[_id];
    //     if(BP.beneficiary == _addr) {
    //         revert("User has received grant!");
    //     }
    // }

    // payable keyword reduces gas
    function withdraw(uint256 _id) external hasTimeElapsed(_id) {
        BeneficiaryProperties storage BP = _beneficiaryProperties[_id];
        address user = BP.beneficiary;
        require(user == msg.sender, "not a beneficiary for a grant!");
        uint256 _amount = BP.amountAllocated;
        require(_amount > 0, "this beneficiary has no money!");
        BP.amountAllocated = 0; // the beneficiary balance is set to zero to prevent reentrancy

        // how to call a function in a function
        // uint256 getBal = getBalance();
        // require(getBal >= _amount, "Insufficient fund");


        // payable keyword makes this address to be able to recieve ether
        payable(user).transfer(_amount);

        BP.status = Status.GRANT_WITHDRAWN; // enum to set the status
        emit CreatedWithdrawnGrant(user, _amount, block.timestamp);
    }

    function withdrawInBatch(uint256 _id, uint256 _amt) external hasTimeElapsed(_id) {
        BeneficiaryProperties storage BP = _beneficiaryProperties[_id];
        address user = BP.beneficiary;
        require(user == msg.sender, "not a beneficiary for a grant!");
        uint256 _amount = _amt;
        require(BP.amountAllocated > 0, "this beneficiary has no money!");

        BP.amountAllocated -= _amt; // the inputted amount is removed from the total amount to prevent reentrancy

        // payable keyword makes this address to be able to recieve ether
        // (bool success, ) = payable(user).call{value: _amount, gas: 5000}(" ");
        payable(user).transfer(_amount);

        emit CreatedWithdrawnGrant(user, _amount, block.timestamp);

        // the enum and condition to set the status
        if(BP.amountAllocated > 0) {
            BP.status = Status.GRANT_PARTLY_WITHDRAWN;
            return;
        } else {
            BP.status = Status.GRANT_WITHDRAWN;
            return;
        }

    }

    function ReverseGrant(uint256 _id) external onlyOwner {
        BeneficiaryProperties storage BP = _beneficiaryProperties[_id];
        require(BP.amountAllocated > 0, "this beneficiary has no money!");

        uint256 _amount = BP.amountAllocated;
        BP.amountAllocated = 0;
        payable(owner).transfer(_amount);

        emit CreatedWithdrawnGrant(owner, _amount, block.timestamp);
    }

    function  returnBeneficiaryInfo(uint256 _id) external view returns(BeneficiaryProperties memory BP) {
        BP = _beneficiaryProperties[_id];
    }

    function getBalance() public view returns(uint256 bal) {
        bal = address(this).balance;
    }

    function getAllBeneficiary() external view returns(BeneficiaryProperties[] memory _bp) {
        uint256[] memory all = id;
        _bp = new BeneficiaryProperties[](all.length);

        for(uint256 i = 0; i < all.length; i++) {
            _bp[i] = _beneficiaryProperties[all[i]];
        }
    }

    receive() external payable {}
    fallback() external payable {}
}