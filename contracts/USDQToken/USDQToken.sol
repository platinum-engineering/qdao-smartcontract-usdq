pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import  "./TrueBurnableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "./TruePausableToken.sol";

contract USDQToken is StandardToken, TrueBurnableToken, DetailedERC20, TruePausableToken {

    event Mint(address indexed to, uint256 amount);

    uint8 constant DECIMALS = 18;

    constructor(address _firstOwner,
                address _secondOwner,
                address _thirdOwner,
                address _governance) DetailedERC20("USDQ Stablecoin by Q DAO v1.0", "USDQ", DECIMALS)  public {

        owners.push(_firstOwner);
        owners.push(_secondOwner);
        owners.push(_thirdOwner);

        ownersIndices[_firstOwner] = 1;
        ownersIndices[_secondOwner] = 2;
        ownersIndices[_thirdOwner] = 3;

        howManyOwnersDecide = 2;
        governanceContracts[_governance] = true;
    }

    function getOwner() external view returns (address) {
        return owners[0];
    }
    

    function mint(address _to, uint256 _amount) external onlyGovernanceContracts() returns (bool){
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }


    function approveForOtherContracts(address _sender, address _spender, uint256 _value) external onlyGovernanceContracts() {
        allowed[_sender][_spender] = _value;
        emit Approval(_sender, _spender, _value);
    }


    function burnFrom(address _to, uint256 _amount) external onlyGovernanceContracts() returns (bool) {
        allowed[_to][msg.sender] = _amount;
        transferFrom(_to, msg.sender, _amount);
        _burn(msg.sender, _amount);
        return true;
    }
}