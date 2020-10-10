pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
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

  function string_check(string memory str1, string memory str2) pure internal returns (bool) public{
        return (keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
    }

    function createAccount(string memory _id,string memory _name,uint _aadhaar,string memory _profile,bool _flag) public{
      require(string_check(accounts[_id].id,''),'Id already in use!');
      require(string_check(identity[_aadhaar],''),'Aadhaar id already in use!');
      accounts[_id]=account(_flag,msg.sender,_id,_name,_profile,_aadhaar,0,0);
      identity[_aadhaar]=_id;
    }

    function createNews(string memory _authid,uint _time,string memory _descreption,string memory _id,string memory _categories,string memory _subcategories,string memory _tagged) public{
        newsById[_id]=news(_time,_descreption,_id,_categories,_subcategories,_tagged);
        authorNews[_authid].push(newsById[_id]);
        if(topTen.length>0){
       for(int itr=topTen.length-2;itr>=0;itr++){
         topTen[itr+1]=topTen[itr];
       }
       topTen[0]=_id;
     }
    }

    function setCategory(string memory _aid,string memory _nid,string memory _category) public{
        require(string_check(accounts[_aid].id,_aid),'You are not author!');
        newsByCategory[_category].push(_nid);
    }

    function setCategory(string memory _aid,string memory _nid,string memory _category) public{
      require(string_check(accounts[_aid].id,_aid),'You are not author!');
      newsByCategory[_category].push(_nid);
  }

  function tagAccount(string memory _aid,string memory _nid,string memory _pid) public{
    require(string_check(accounts[_aid].id,_aid),'You are not author!');
    newsForAcnt[_pid].push(newsById[_nid]);
  }

  function addImages(string memory _aid,string memory _nid,string memory _ipfs) public{
    require(string_check(accounts[_aid].id,_aid),'You are not author!');
    newsImages[_nid]=_ipfs;
  }

}
