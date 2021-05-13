//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol";

contract SampleERC20FixedSupply is ERC20PresetFixedSupplyUpgradeable {
    uint256 public constant version = 1;
}
