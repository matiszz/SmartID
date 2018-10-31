pragma solidity ^0.4.21;

import "./RBAC.sol";


contract CitizensRecord is RBAC {
    bool public status;
    address admin;
    uint public numberOfActiveUsers;
    uint32 nextId;

    mapping(uint32 => Citizen) citizensStorage;
    mapping(uint32 => ClinicRecords) clinicStorage;
    mapping(uint32 => LegalRecords) legalStorage;

    struct Citizen {
        bool alive;
        string name;
        string lastName;
        string birthDate;
        string gender;
        string nacionality;
        string residence;
        string city;
        uint32 ID;
    }

    struct ClinicRecords {
        Register[] records;
    }

    struct LegalRecords {
        Register[] records;
    }

    struct Register {
        string record;
        string date;
        bool valid;
    }

    event UserAdded(uint32 ID);
    event UserRemoved(uint32 ID);
    event StatusChanged(bool Status);

    constructor() public {
        admin = msg.sender;
        addRole(msg.sender, RolesEnum.Admin);
    }

    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "Only the admin can call this function."
        );
        _;
    }

    function is_available(uint32 _ID) private view returns (bool){
        return citizensStorage[_ID].ID == 0;
    }

    function isAlive(uint32 _ID) private view returns (bool){
        return citizensStorage[_ID].alive;
    }

    function register_citizen(
        string _name,
        string _lastName,
        string _birthDate,
        string _gender,
        string _nacionality,
        string _residence,
        string _city,
        uint32 _ID) public onlyAdmin {

        require(is_available(_ID), "The ID it's not available");

        Citizen memory citizen;

        citizen.name = _name;
        citizen.lastName = _lastName;
        citizen.birthDate = _birthDate;
        citizen.gender = _gender;
        citizen.nacionality = _nacionality;
        citizen.residence = _residence;
        citizen.city = _city;
        citizen.ID = _ID;
        citizen.alive = true;

        citizensStorage[_ID] = citizen;
        numberOfActiveUsers++;
        emit UserAdded(_ID);
    }

    function removeUser(uint32 ID) public onlyAdmin {
        require(isAlive(ID), 'The citizen is dead');

        citizensStorage[ID].alive = false;
        event UserRemoved(ID);
    }

    function registerClinicRecord(
        uint32 ID,
        string record,
        string date
    ) public onlyRoles(msg.sender, [RolesEnum.Doctor, RolesEnum.Admin]) {
        require(isAlive(ID), 'The citizen is dead');

        Register memory reg;
        reg.record = record;
        reg.date = date;
        reg.valid = true;

        clinicStorage[ID].records.push(reg);
    }

    function registerLegalRecord(
        uint32 ID,
        string record,
        string date
    ) onlyRoles(msg.sender, [RolesEnum.Police, RolesEnum.Admin]) {
        require(isAlive(ID), 'The citizen is dead');

        Register memory reg;
        reg.record = record;
        reg.date = date;
        reg.valid = true;

        legalStorage[ID].records.push(reg);
    }

    function deleteClinicRecord(
        uint32 ID,
        uint32 recordPosition
    ) public onlyRoles(msg.sender, [RolesEnum.Doctor, RolesEnum.Admin]) {
        require(isAlive(ID), 'The citizen is dead');
        require(clinicStorage[ID].records[recordPosition].valid, "The incident does not exist");

        clinicStorage[ID].records[recordPosition].valid = false;
    }

    function deleteLegalRecord(
        uint32 ID,
        uint32 recordPosition
    ) public onlyRoles(msg.sender, [RolesEnum.Police, RolesEnum.Admin]) {
        require(isAlive(ID), 'The citizen is dead');
        require(legalStorage[ID].records[recordPosition].valid, "The incident does not exist");

        legalStorage[ID].records[recordPosition].valid = false;
    }

    function getRegister(Register r) private returns (string[]) {
        string[] res;
        res.push(r.record);
        res.push(r.date);
        res.push(string(r.valid));
        return res;
    }

    function getClinicRecords(
        uint32 ID
    ) public onlyRoles(msg.sender, [RolesEnum.Doctor, RolesEnum.Admin]) returns (string[]) {
        require(is_available(_ID), "The ID it's not available");
        string[] res;
        for (uint i = 0; i < clinicStorage[ID]; i++) {
            res.push(getRegister(clinicStorage[ID][i]));
        }
        return res;
    }

    function getLegalRecords(
        uint32 ID
    ) public onlyRoles(msg.sender, [RolesEnum.Police, RolesEnum.Admin]) returns (string[]) {
        require(is_available(_ID), "The ID it's not available");
        string[] res;
        for (uint i = 0; i < legalStorage[ID]; i++) {
            res.push(getRegister(legalStorage[ID][i]));
        }
        return res;
    }

    function addRole(address addr, RolesEnum roleName) public onlyAdmin {
        addRole(addr, roleName);
    }

    function removeRole(address addr, RolesEnum roleName) public onlyAdmin {
        removeRole(addr, roleName);
    }

    function changeStatus(bool st) public onlyAdmin {
        status = st;
        emit StatusChanged(st);
    }


    // function set_personalAddress(
    //     uint32 _ID,
    //     string _personalAddress) public onlypresident {
    //         require(!is_available( _ID ), "The ID doesn't exists");
    //             Citizen memory citizen;
    //             citizen = citizensStorage[_ID];
    //             citizen.personalAddress = _personalAddress;
    // }

    function get_name(uint32 _ID) public view returns (uint32, string, string) {

        return (citizensStorage[_ID].ID, citizensStorage[_ID].name, citizensStorage[_ID].lastName);
    }

    function get_residency(uint32 _ID) public view returns (uint32, string, string, string, string) {

        return (citizensStorage[_ID].ID, citizensStorage[_ID].name, citizensStorage[_ID].nacionality, citizensStorage[_ID].residence, citizensStorage[_ID].city);
    }

    function get_basic_info(uint32 _ID) public view returns (uint32, string, string, string, string) {

        return (citizensStorage[_ID].ID, citizensStorage[_ID].name, citizensStorage[_ID].birthDate, citizensStorage[_ID].gender, citizensStorage[_ID].nacionality);
    }

    function view_president_address() public view returns (address) {
        //require(is_available( _ID ), "The ID it's not available");
        return admin;
    }

}
