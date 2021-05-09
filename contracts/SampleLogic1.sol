// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract SampleLogic1 {
    uint256 private value;
 
    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);
 
    // Stores a new value in the contract
    function store(uint256 newValue) public {
        uint256 nextValue = newValue;
        if (newValue < 1000000000) {
            nextValue = newValue * 2;
        } else {
            nextValue = newValue - 1000000000;
        }
        value = nextValue;
        emit ValueChanged(nextValue);
    }
 
    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
}
