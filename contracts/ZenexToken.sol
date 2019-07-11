pragma solidity >=0.4.21 <0.6.0;

contract ZenexToken {
  string public name = 'Zenex Token';
  string public symbol = 'ZENT';
  string public standard = 'Zenex Token v1.0';

  uint256 public totalSupply;
  mapping(address => uint256) public balanceOf;

  event Transfer(  
      address indexed _from,
      address indexed _to,
      uint256 _value
  );

  constructor(uint256 _initialSupply) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
    //allocate initial supply
  }

  //transfer function
  //exception if not enough token
  //event emit
  //return a boolean value

  function transfer(address _to, uint256 _value) public returns (bool success) {
      require(balanceOf[msg.sender] >= _value);
      balanceOf[msg.sender] -= _value;
      balanceOf[_to] += _value;

      emit Transfer(msg.sender, _to, _value);
      return true;
  }

}