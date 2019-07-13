pragma solidity >=0.4.21 <0.6.0;

import "./ZenexToken.sol";

contract ZenexTokenSale {
    address admin;
    ZenexToken public tokenContract;
    uint256 public tokenPrice;

    //constructor
    constructor(ZenexToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }
}