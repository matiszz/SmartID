pragma solidity ^0.4.21;

import "./RBAC-SM.sol";


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
        bytes32 image;
    }

    struct ClinicRecords {
        Register[] records;
    }

    struct LegalRecords {
        Register[] records;
    }

    struct Register {
        bytes32 record;
        bytes32 date;
        bool valid;
    }

    event UserAdded(uint32 ID);
    event UserRemoved(uint32 ID);
    event StatusChanged(bool Status);
    event SendRegister(bytes32 record, bytes32 date, bool valid);

    constructor() public {
        admin = msg.sender;
        addRole(msg.sender, 3);
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
        uint32 _ID,
        bytes32 _image) public onlyAdmin {

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
        citizen.image = _image;
        citizen.alive = true;

        citizensStorage[_ID] = citizen;
        numberOfActiveUsers++;
        emit UserAdded(_ID);
    }

    function modify_citizen(
        string _name,
        string _lastName,
        string _birthDate,
        string _gender,
        string _nacionality,
        string _residence,
        string _city,
        uint32 _ID,
        bytes32 _image) public onlyAdmin {

        require(!is_available(_ID), "there is no one with this ID");

        Citizen storage citizen = citizensStorage[_ID];

        citizen.name = _name;
        citizen.lastName = _lastName;
        citizen.birthDate = _birthDate;
        citizen.gender = _gender;
        citizen.nacionality = _nacionality;
        citizen.residence = _residence;
        citizen.city = _city;
        citizen.ID = _ID;
        citizen.image = _image;
        citizen.alive = true;
    }

    function removeUser(uint32 ID) public onlyAdmin {
        require(isAlive(ID), 'The citizen is dead');

        citizensStorage[ID].alive = false;
        numberOfActiveUsers--;
        emit UserRemoved(ID);
    }

    function registerClinicRecord(
        uint32 ID,
        bytes32 record,
        bytes32 date
    ) public onlyRoles(msg.sender, [2, 3]) {
        require(isAlive(ID), 'The citizen is dead');

        Register[] storage aux = legalStorage[ID].records;

        Register memory reg;
        reg.record = record;
        reg.date = date;
        reg.valid = true;

        aux.push(reg);
    }

    function registerLegalRecord(
        uint32 ID,
        bytes32 record,
        bytes32 date
    ) public onlyRoles(msg.sender, [1, 3]) {
        require(isAlive(ID), 'The citizen is dead');

        Register[] storage aux = legalStorage[ID].records;

        Register memory reg;
        reg.record = record;
        reg.date = date;
        reg.valid = true;

        aux.push(reg);
    }


    function deleteClinicRecord(
        uint32 ID,
        uint32 recordPosition
    ) public onlyRoles(msg.sender, [2, 3]) {
        require(isAlive(ID), 'The citizen is dead');
        require(clinicStorage[ID].records[recordPosition].valid, "The incident does not exist");

        clinicStorage[ID].records[recordPosition].valid = false;
    }

    function deleteLegalRecord(
        uint32 ID,
        uint32 recordPosition
    ) public onlyRoles(msg.sender, [1, 3]) {
        require(isAlive(ID), 'The citizen is dead');
        require(legalStorage[ID].records[recordPosition].valid, "The incident does not exist");

        legalStorage[ID].records[recordPosition].valid = false;
    }

    function getNumberClinicRecords(uint32 ID) public view onlyRoles(msg.sender, [2, 3]) returns (uint) {
        require(is_available(ID), "The ID it's not available");
        return clinicStorage[ID].records.length;
    }

    function getNumberLegalRecords(uint32 ID) public view onlyRoles(msg.sender, [1, 3]) returns (uint) {
        require(!is_available(ID), "The ID it's not available");
        return legalStorage[ID].records.length;
    }

    function getClinicRecords(
        uint32 ID,
        uint32 position
    ) public onlyRoles(msg.sender, [2, 3]) returns (bytes32, bytes32, bool) {
        require(!is_available(ID), "The ID it's not available");
        Register storage r = clinicStorage[ID].records[position];

        emit SendRegister(r.record, r.date, r.valid);

        return (r.record, r.date, r.valid);
    }

    function getLegalRecords(
        uint32 ID,
        uint32 position
    ) public onlyRoles(msg.sender, [1, 3]) returns (bytes32, bytes32, bool) {
        require(!is_available(ID), "The ID it's not available");
        Register storage r = legalStorage[ID].records[position];

        emit SendRegister(r.record, r.date, r.valid);

        return (r.record, r.date, r.valid);
    }


    function addRole(address addr, uint8 roleNumber) public onlyAdmin {
        require(roleNumber >= 0 && roleNumber < 4, 'Role not in the list');
        giveRole(addr, roleNumber);
    }

    function removeRole(address addr, uint8 roleNumber) public onlyAdmin {
        require(roleNumber >= 0 && roleNumber < 4, 'Role not in the list');
        takeAwayRole(addr, roleNumber);
    }

    function hasSpecificRole(address addr, uint8 roleName) public view returns (bool) {
        return hasRole(addr, roleName);
    }


    function changeStatus(bool st) public onlyAdmin {
        status = st;
        emit StatusChanged(st);
    }

    function get_name(uint32 _ID) public view returns (uint32, string, string) {

        return (citizensStorage[_ID].ID, citizensStorage[_ID].name, citizensStorage[_ID].lastName);
    }

    function get_residency(uint32 _ID) public view returns (uint32, string, string, string, string) {

        return (citizensStorage[_ID].ID, citizensStorage[_ID].name, citizensStorage[_ID].nacionality, citizensStorage[_ID].residence, citizensStorage[_ID].city);
    }

    function get_basic_info(uint32 _ID) public view returns (uint32, string, string, string, string, bytes32, bool) {

        return (citizensStorage[_ID].ID, citizensStorage[_ID].name, citizensStorage[_ID].birthDate, citizensStorage[_ID].gender, citizensStorage[_ID].nacionality, citizensStorage[_ID].image, citizensStorage[_ID].alive);
    }

    function view_president_address() public view returns (address) {
        return admin;
    }

}
