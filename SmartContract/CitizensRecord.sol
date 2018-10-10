pragma solidity^0.4.25;

contract CitizensRecord {

    struct citizen {
        string name;
        string ID;
        string address;
    }

    Citizen[] public citizens;
    address president;

    constructor() public {
        president = msg.sender;
    }

    modifier onlypresident() {
        require(
            msg.sender == president,
            "Only the president of the country can call this function."
        );
        _;
    } 



    function registerCitizen(
        string _name, 
        string _ID, 
        uint _weight, 
        uint _height) public onlydoctor {
            citizens.push(Citizen(_name, _ID, _weight, _height));
        }
}