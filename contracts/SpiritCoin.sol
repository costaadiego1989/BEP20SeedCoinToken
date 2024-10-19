// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract SpiritCoin {
    
    string public name = "Spirit Coin";
    string public symbol = "SPT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** decimals;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    mapping(address => uint256) public _balances;

    constructor() {
        _balances[msg.sender] = totalSupply;
    }

    function balanceOf(address _owner) public returns (uint256) {
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf(msg.sender) >= _value, "Insufficient balance");

        _balances[msg.sender] -= _value;
        _balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

}
