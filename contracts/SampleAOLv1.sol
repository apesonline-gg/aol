//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract SampleAOLv1 is ERC20PresetFixedSupplyUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    uint256 public constant version = 1;

    function initialize(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address owner
    ) public virtual override initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        __ERC20PresetFixedSupply_init(name, symbol, initialSupply, owner);
        transferOwnership(owner);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}

