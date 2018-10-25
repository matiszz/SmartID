pragma solidity^0.4.25;

contract CitizensRecord {

    struct Citizen {
        string name;
        string lastName;
        string birthDate;
        string gender;
        string nacionality;
        string residence;
        string city;
        uint32 ID;
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
        string _lastName,
        string _birthDate,
        string _gender,
        string _nacionality,
        string _residence,
        string _city,
        uint32 _ID ) public onlypresident {
           
        require(is_available( _ID ), "The ID it's not available");
            
            Citizen memory citizen;
            
            citizen.name = _name;
            citizen.lastName = _lastName;
            citizen.birthDate = _birthDate;
            citizen.gender = _gender;
            citizen.nacionality = _nacionality;
            citizen.residence = _residence;
            citizen.city = _city;
            citizen.ID = _ID;

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

    function get_name(uint32 _ID) public view returns (uint32, string, string ) {
        
        return (citizensStorage[_ID].ID, citizensStorage[_ID].name, citizensStorage[_ID].lastName );
    }

    function get_residency(uint32 _ID) public view returns (uint32, string, string, string, string ) {
        
        return (citizensStorage[_ID].ID, citizensStorage[_ID].name, citizensStorage[_ID].nacionality, citizensStorage[_ID].residence, citizensStorage[_ID].city);
    }

    function get_basic_info(uint32 _ID) public view returns (uint32, string, string, string, string ) {
        
        return (citizensStorage[_ID].ID, citizensStorage[_ID].name, citizensStorage[_ID].birthDate, citizensStorage[_ID].gender, citizensStorage[_ID].nacionality);
    }

    function view_president_address() public view returns (address) {
        //require(is_available( _ID ), "The ID it's not available");
        return president;
    }
}

