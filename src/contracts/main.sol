pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract main {

  string[] public topTen;

  struct news{
    uint timestamp;
    string descreption;
    string title;
    string id;
    string author;
  }

 struct account{
   address payable acntAddress;
   uint donated;
   uint received;
 }

  mapping (address => account) public accounts;
  mapping (string=>address payable) addresses;
  mapping (string => news) public newsById;
  mapping (string => news[]) public authorNews;
  mapping (string => string[]) public newsImages;
  mapping (string => news[]) public newsByCategory;
  mapping (string => news[]) public newsForAcnt;
  mapping (string => string[]) public verifiedNews;
  mapping (string => string[]) public categoriesForNews;
  mapping (string => string[]) public taggedForNews;

  function string_check(string memory str1, string memory str2) pure internal returns (bool) {
        return (keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
    }

    function createNews(string memory _hashedaddr,string memory _title,string memory _ipfs,uint _time,string memory _descreption,string memory _id,string[] memory _categories,string[] memory _tagged) public{
        if(addresses[_hashedaddr]==address(0)){
        addresses[_hashedaddr]=msg.sender;
        accounts[msg.sender]=account(msg.sender,0,0);
      }
        newsById[_id]=news(_time,_descreption,_title,_id,_hashedaddr);
        authorNews[_hashedaddr].push(newsById[_id]);
        for(uint itr=0;itr<_categories.length;itr++){
          categoriesForNews[_id].push(_categories[itr]);
          newsByCategory[_categories[itr]].push(newsById[_id]);
        }
        for(uint itr=0;itr<_tagged.length;itr++){
          taggedForNews[_id].push(_tagged[itr]);
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
     newsImages[_id].push(_ipfs);
    }

  function addImages(string memory _auth,string memory _nid,string memory _ipfs) public{
    require(string_check(_auth,newsById[_nid].author),'You are not author!');
    newsImages[_nid].push(_ipfs);
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
    if(addresses[_sender]==address(0)){
    addresses[_sender]=msg.sender;
    accounts[msg.sender]=account(msg.sender,0,0);
  }
    (addresses[_receiver]).transfer(msg.value);
    accounts[addresses[_receiver]].received+=msg.value;
    accounts[msg.sender].donated+=msg.value;
  }

}
