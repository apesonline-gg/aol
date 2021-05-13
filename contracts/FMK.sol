// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FMK is ERC20 {
    constructor() ERC20("Fuck Marry Kill", "FMK") {
        _mint(msg.sender, 100000000000000000000000000);
    }
}