pragma solidity^0.4.25;

contract CitizensRecord {

    struct Citizen {
        string name;
        uint32 ID;
        string personalAddress;
    }

    address president;

    constructor() public {
        president = msg.sender;
    }
    
    // This contract only defines a modifier but does not use
    // it: it will be used in derived contracts.
    // The function body is inserted where the special symbol
    // `_;` in the definition of a modifier appears.
    // This means that if the president calls this function, the
    // function is executed and otherwise, an exception is
    // thrown.
    modifier onlypresident() {
        require(
            msg.sender == president,
            "Only the president of the country can call this function."
        );
        _;
    } 

    // Citizen[] public citizensStorage;
    mapping(uint32=>Citizen) citizensStorage;
    
    function is_available(uint32 _ID) private view returns (bool){
                    return citizensStorage[_ID].ID == 0 ? true : false;
    }

    function register_citizen(
        string _name, 
        uint32 _ID,
        string _personalAddress) public onlypresident {
           // citizensStorage.push(Citizen(_name, _ID, _adresss));
            require(is_available( _ID ), "The ID it's not available");
                Citizen memory citizen;
                citizen.ID = _ID;
                citizen.name = _name;
                citizen.personalAddress = _personalAddress;
                citizensStorage[_ID] = citizen;           
    }

    // function set_personalAddress(
    //     uint32 _ID,
    //     string _personalAddress) public onlypresident {
        
    //         require(!is_available( _ID ), "The ID doesn't exists");
    //             Citizen memory citizen;
    //             citizen = citizensStorage[_ID];
    //             citizen.personalAddress = _personalAddress;
    // }

    function query_id(uint32 _ID) public view returns (uint32, string, string ) {
        //require(is_available( _ID ), "The ID it's not available");
        return (citizensStorage[_ID].ID, citizensStorage[_ID].name, citizensStorage[_ID].personalAddress);
    }
}

