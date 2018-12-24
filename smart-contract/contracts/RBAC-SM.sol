pragma solidity ^0.4.21;

import "./Roles.sol";


contract RBAC {
    using Roles for Roles.Role;
    //enum RolesEnum {Government, Police, Doctor, Admin}
    // RolesEnum =       [0,        1,      2,     3]
    //mapping (uint => uint) testMapping;

    mapping(uint8 => Roles.Role) private roles;

    event RoleAdded(address addr, uint8 roleName);
    event RoleRemoved(address addr, uint8 roleName);


    /**
    * @dev gets the uint value of a RolesEnum
    * @param r RolesEnum
    * @return uint
    */
//    function getUintValue(RolesEnum r) constant internal returns(uint){
//        return testMapping[uint(r)];
//    }

//    function getEnum(uint roleNumber) internal returns(RolesEnum) {
//        if (roleNumber == 0) return RolesEnum.Government;
//        if (roleNumber == 0) return RolesEnum.Police;
//        if (roleNumber == 0) return RolesEnum.Doctor;
//        if (roleNumber == 0) return RolesEnum.Admin;
//    }

    /**
     * @dev reverts if addr does not have role
     * @param addr address
     * @param roleName the name of the role
     * // reverts
     */
    function checkRole(address addr, uint8 roleName) internal view {
        roles[roleName].check(addr);
    }

    /**
     * @dev determine if addr has role
     * @param addr address
     * @param roleName the name of the role
     * @return bool
     */
    function hasRole(address addr, uint8 roleName) internal view returns (bool) {
        return roles[roleName].has(addr);
    }

    /**
     * @dev add a role to an address
     * @param addr address
     * @param roleName the name of the role
     */
    function giveRole(address addr, uint8 roleName) internal {
        roles[roleName].add(addr);
        emit RoleAdded(addr, roleName);
    }

    /**
     * @dev remove a role from an address
     * @param addr address
     * @param roleName the name of the role
     */
    function takeAwayRole(address addr, uint8 roleName) internal {
        roles[roleName].remove(addr);
        emit RoleRemoved(addr, roleName);
    }

    /**
     * @dev modifier to scope access to a single role (uses msg.sender as addr)
     * @param roleName the name of the role
     * // reverts
     */
    modifier onlyRole(address addr, uint8 roleName) {
        checkRole(addr, roleName);
        _;
    }

    /**
     * @dev modifier to scope access to a set of roles (uses msg.sender as addr)
     * @param roleNames the names of the roles to scope access to
     */
    modifier onlyRoles(address addr, uint8[2] roleNames) {
        bool hasAnyRole = false;
        for (uint8 i = 0; i < 2; i++) {
            if (hasRole(addr, roleNames[i])) {
                hasAnyRole = true;
                break;
            }
        }

        require(hasAnyRole);

        _;
    }
}
