pragma solidity ^0.5.0;

contract main {

  string[] topTen;

  struct news{
    uint timestamp;
    string descreption;
    string id;
    string categories;
    string subCategoties;
    string tagged;
  }

 struct account{
   bool isprivate;
   address payable acntAddress;
   string id;
   string name;
   string profileHash;
   uint aadhaar;
   uint donated;
   uint received;
 }

  mapping (string => account) public accounts;
  mapping (string => news) public newsById;
  mapping (string => news[]) public authorNews;
  mapping (string => string) public newsImages;
  mapping (string => news[]) public newsByCategory;
  mapping (string => news[]) public newsForAcnt;
  mapping (string => string[]) public verifiedNews;
  mapping (uint => string) public identity;

}
