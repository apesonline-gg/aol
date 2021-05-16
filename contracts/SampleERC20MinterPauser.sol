//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol";

contract SampleERC20MinterPauser is ERC20PresetMinterPauserUpgradeable {
    uint256 public constant version = 0;
}
