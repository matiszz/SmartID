pragma solidity ^0.4.21;

import "./Roles.sol";


contract RBAC {
    using Roles for Roles.Role;
    enum RolesEnum {Government, Police, Doctor, Admin}
    mapping (uint => uint) testMapping

    mapping(RolesEnum => Roles.Role) private roles;

    event RoleAdded(address addr, bytes32 roleName);
    event RoleRemoved(address addr, bytes32 roleName);


    /**
    * @dev gets the uint value of a RolesEnum
    * @param r RolesEnum
    * @return uint
    */
    function getUintValue(RolesEnum r) constant internal returns(uint){
        return testMapping[uint(r)];
    }

    /**
     * @dev reverts if addr does not have role
     * @param addr address
     * @param roleName the name of the role
     * // reverts
     */
    function checkRole(address addr, RolesEnum roleName) view public {
        roles[getUintValue(roleName)].check(addr);
    }

    /**
     * @dev determine if addr has role
     * @param addr address
     * @param roleName the name of the role
     * @return bool
     */
    function hasRole(address addr, RolesEnum roleName) view public returns (bool) {
        return roles[getUintValue(roleName)].has(addr);
    }

    /**
     * @dev add a role to an address
     * @param addr address
     * @param roleName the name of the role
     */
    function addRole(address addr, RolesEnum roleName) internal {
        roles[getUintValue(roleName)].add(addr);
        emit RoleAdded(addr, roleName);
    }

    /**
     * @dev remove a role from an address
     * @param addr address
     * @param roleName the name of the role
     */
    function removeRole(address addr, RolesEnum roleName) internal {
        roles[getUintValue(roleName)].remove(addr);
        emit RoleRemoved(addr, roleName);
    }

    /**
     * @dev modifier to scope access to a single role (uses msg.sender as addr)
     * @param roleName the name of the role
     * // reverts
     */
    modifier onlyRole(address addr, RolesEnum roleName) {
        checkRole(addr, roleName);
        _;
    }

    /**
     * @dev modifier to scope access to a set of roles (uses msg.sender as addr)
     * @param roleNames the names of the roles to scope access to
     */
    modifier onlyRoles(address addr, RolesEnum[] roleNames) {
        bool hasAnyRole = false;
        for (uint8 i = 0; i < roleNames.length; i++) {
            if (hasRole(addr, roleNames[i])) {
                hasAnyRole = true;
                break;
            }
        }

        require(hasAnyRole);

        _;
    }
}
