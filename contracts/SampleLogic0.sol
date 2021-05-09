// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract SampleLogic0 {
    string public name;
    uint256 private value;
 
    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);
 
    // Stores a new value in the contract
    function initialize(uint256 newValue) public {
        name = "SampleLogic0";
        value = newValue;
        emit ValueChanged(newValue);
    }
 
    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
}
