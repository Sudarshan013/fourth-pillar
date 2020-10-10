pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract main {

  string[] public topTen;

  struct news{
    uint timestamp;
    string descreption;
    string id;
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
  mapping (string => string[]) public categoriesForNews;
  mapping (string => string[]) public taggedForNews;

  function string_check(string memory str1, string memory str2) pure internal returns (bool) {
        return (keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
    }

    function createAccount(string memory _id,string memory _name,uint _aadhaar,string memory _profile,bool _flag) public{
      require(string_check(accounts[_id].id,''),'Id already in use!');
      require(string_check(identity[_aadhaar],''),'Aadhaar id already in use!');
      accounts[_id]=account(_flag,msg.sender,_id,_name,_profile,_aadhaar,0,0);
      identity[_aadhaar]=_id;
    }

    function createNews(string memory _authid,uint _time,string memory _descreption,string memory _id,string[] memory _categories,string[] memory _tagged) public{
      require(!string_check(accounts[_authid].id,''),'Not a valid Account!');
        newsById[_id]=news(_time,_descreption,_id);
        authorNews[_authid].push(newsById[_id]);
        for(uint itr=0;itr<_categories.length;itr++){
          categoriesForNews[_id].push(_categories[itr]);
          newsByCategory[_categories[itr]].push(newsById[_id]);
        }
        for(uint itr=0;itr<_tagged.length;itr++){
          newsForAcnt[_tagged[itr]].push(newsById[_id]);
        }
        if(topTen.length==10){
       for(uint itr=9;itr>=1;itr--){
         topTen[itr]=topTen[itr-1];
       }
       topTen[0]=_id;
     }
     else
     topTen.push(_id);
    }

  function addImages(string memory _aid,string memory _nid,string memory _ipfs) public{
    require(string_check(accounts[_aid].id,_aid),'You are not author!');
    newsImages[_nid]=_ipfs;
  }

  function verification(string memory _newsId,string memory _acntId,string[] memory _tagged) public{
    bool flag=false;
    for(uint itr=0;itr<_tagged.length;itr++){
      if(string_check(_tagged[itr],_acntId)){
        flag=true;
        break;
      }
    }
    if(flag==true){
      verifiedNews[_newsId].push(_acntId);
    }
  }

  function getAuthorNews(string memory _id) public returns(news[] memory){
    return authorNews[_id];
  }

  function getCategoryNews(string memory _category) public returns(news[] memory){
    return newsByCategory[_category];
  }

  function getTaggedNews(string memory _id) public returns(news[] memory){
    return newsForAcnt[_id];
  }

  function getNewsVerifier(string memory _id) public returns(string[] memory){
    return verifiedNews[_id];
  }

  function getCategories(string memory _id) public returns(string[] memory){
    return categoriesForNews[_id];
  }

  function getTagged(string memory _id) public returns(string[] memory){
    return taggedForNews[_id];
  }

  function getTopCount() public returns(uint){
    return topTen.length;
  }

  function tipAccount(string memory _sender,string memory _receiver) public payable{
    (accounts[_receiver].acntAddress).transfer(msg.value);
    accounts[_receiver].received+=msg.value;
    accounts[_sender].donated+=msg.value;
  }

}
