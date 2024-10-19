// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TheSeedCoin is ERC20 {

    address private owner;
    uint256 mintAmount;
    uint64 private mintDelay =  60 * 60 * 24;

    mapping(address => uint256) public nextMint;

    constructor() ERC20("Seed Coin", "SDS") {
        owner = msg.sender;
        _mint(msg.sender, 1000000 * 10 ** 18);
    }

    function mint() public restricted {
        require(block.timestamp > nextMint[owner], "You don't mint twice in a row");
        _mint(owner, mintAmount);
        nextMint[owner] = block.timestamp + mintDelay;
    }

    function setMinting(uint256 _newValue) public restricted {
        mintAmount = _newValue;
    }

    function setMintingDelay(uint64 _delayInSeconds) public restricted {
        mintDelay = _delayInSeconds;
    }

    modifier restricted() {
        require(owner == msg.sender, "You don't have permission");
        _;
    }

}