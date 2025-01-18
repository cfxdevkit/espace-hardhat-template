// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract StringStorage {
    string private storedString;
    address public owner;
    
    event StringUpdated(string newValue, address updatedBy);
    
    constructor(string memory initialString) {
        storedString = initialString;
        owner = msg.sender;
    }
    
    function setString(string memory newString) public {
        require(bytes(newString).length > 0, "String cannot be empty");
        storedString = newString;
        emit StringUpdated(newString, msg.sender);
    }
    
    function getString() public view returns (string memory) {
        return storedString;
    }
    
    function getStringLength() public view returns (uint) {
        return bytes(storedString).length;
    }
} 