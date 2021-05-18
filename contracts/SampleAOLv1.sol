//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract SampleAOLv1 is ERC20PresetFixedSupplyUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    uint256 public constant version = 1;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    function updateStorage(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address owner
    ) public {
        _name = name;
        _symbol = symbol;
        _totalSupply = initialSupply;
        transferOwnership(owner);
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}

