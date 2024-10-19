// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract SpiritCoin {
    
    string public name = "Spirit Coin";
    string public symbol = "SPT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** decimals;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

}
