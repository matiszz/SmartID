import { web3 } from "./config";
import contract from "./config";

export function getAddress() {
    return contract.options.address;
}

/**
 * Returns an array with all the accounts.
 */
export async function getAccounts() {
    return await web3.eth.getAccounts();
}

/**
 * Returns the Transaction Receipt or an error.
 */
export async function getTransactionReceipt(trasnsactionHash) {
    try {
        await web3.eth.getTransactionReceipt(trasnsactionHash, (err, receipt) => {
            if (err) console.error("Error al obtener el recibo", err);
            else return receipt;
        });
    } catch (err) {
        console.error("Error al obtener el recibo", err);
        return err;
    }
}

/**
 * Registers a new citizen.
 *
 * @param {Object} citizen Citizen object
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function registerCitizen(citizen) {
    // Get the accounts vector from our function
    const accounts = await this.getAccounts();

    contract.methods.register_citizen(citizen.name, citizen.surname, citizen.birthDate, citizen.gender, citizen.nationality, citizen.residence, citizen.city, citizen.idNum, citizen.profilePic).send({
            from: accounts[0]
        },
        (err, transHash) => {
            if (err) return {success: false};
            else return {success: true, hash: transHash};
        });
}

/**
 * Change some atributes from a citizen.
 *
 * @param {Object} citizen Citizen object
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function modify_citizen(citizen) {
    // Get the accounts vector from our function
    const accounts = await this.getAccounts();

    contract.methods.modify_citizen(citizen.name, citizen.surname, citizen.birthDate, citizen.gender, citizen.nationality, citizen.residence, citizen.city, citizen.idNum, citizen.profilePic).send({
            from: accounts[0]
        },
        (err, transHash) => {
            if (err) return {success: false};
            else return {success: true, hash: transHash};
        });
}

/**
 * Remove a citizen.
 *
 * @param {number} id ID number
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function removeCitizen(id) {
    // Get the accounts vector from our function
    const accounts = await this.getAccounts();

    contract.methods.removeUser(id).send({
            from: accounts[0]
        },
        (err, transHash) => {
            if (err) return {success: false};
            else return {success: true, hash: transHash};
        });
}

/**
 * Register a new clinic record to citiced
 *
 * @param {number} id ID number
 * @param {Object} record String object
 * @param {Object} date String object
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function registerClinicRecord(id, record, date) {
    const accounts = await this.getAccounts();

    contract.methods.registerClinicRecord(id, record, date).send({
            from: accounts[0]
        },
        (err, transHash) => {
            if (err) return {success: false};
            else return {success: true, hash: transHash};
        });
}

/**
 * Register a new legal record to citizen
 *
 * @param {number} id ID number
 * @param {Object} record String object
 * @param {Object} date String object
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function registerLegalRecord(id, record, date) {
    const accounts = await this.getAccounts();

    contract.methods.registerLegalRecord(id, record, date).send({
            from: accounts[0]
        },
        (err, transHash) => {
            if (err) return {success: false};
            else return {success: true, hash: transHash};
        });
}

/**
 * Remove a clinic record from the citizen
 *
 * @param {number} id ID number
 * @param {Object} record_position Integer object
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function deleteClinicRecord(id, record_position) {
    const accounts = await this.getAccounts();

    contract.methods.deleteClinicRecord(id, record_position).send({
            from: accounts[0]
        },
        (err, transHash) => {
            if (err) return {success: false};
            else return {success: true, hash: transHash};
        });
}

/**
 * Remove a legal record from the citizen
 *
 * @param {number} id ID number
 * @param {Object} record_position Integer object
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function deleteLegalRecord(id, record_position) {
    const accounts = await this.getAccounts();

    contract.methods.deleteLegalRecord(id, record_position).send({
            from: accounts[0]
        },
        (err, transHash) => {
            if (err) return {success: false};
            else return {success: true, hash: transHash};
        });
}

/**
 * Give the number of clinic records of the citizen
 *
 * @param {number} id ID number
 *
 * @return {Object} number of clinic records.
 */
export async function getNumberClinicRecords(id) {
    let lenght = -1;
    const accounts = await this.getAccounts();

    contract.methods.getNumberClinicRecords(id).call({ from: accounts[0] }, (err, len) => {
        if (err) console.log('ERROR!', err);
        else lenght = len;
    });
    return lenght;
}

/**
 * Give the number of legal records of the citizen
 *
 * @param {number} id ID number
 *
 * @return {Object} number of legal records.
 */
export async function getNumberLegalRecords(id) {
    let lenght = -1;
    const accounts = await this.getAccounts();

    contract.methods.getNumberLegalRecords(id).call({ from: accounts[0] }, (err, len) => {
        if (err) console.log('ERROR!', err);
        else lenght = len;
    });
    return lenght;
}

/**
 * Give a specific clinic record of the citizen
 *
 * @param {number} id ID number
 *
 * @return {Object} clinic record.
 */
export async function getClinicRecords(id, position) {
    let record = '';
    const accounts = await this.getAccounts();

    contract.methods.getClinicRecords(id, position).call({ from: accounts[0] }, (err, rec) => {
        if (err) console.log('ERROR!', err);
        else record = rec;
    });
    return record;
}

/**
 * Give a specific legal record of the citizen
 *
 * @param {number} id ID number
 *
 * @return {Object} legal record.
 */
export async function getLegalRecords(id, position) {
    let record = '';
    const accounts = await this.getAccounts();

    contract.methods.getLegalRecords(id, position).call({ from: accounts[0] }, (err, rec) => {
        if (err) console.log('ERROR!', err);
        else record = rec;
    });
    return record;
}

/**
 * Change the Smart Contract stete 
 *
 * @param {bool} new state
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function changeStatus(state) {
    const accounts = await this.getAccounts();

    contract.methods.changeStatus(state).send({
            from: accounts[0]
        },
        (err, transHash) => {
            if (err) return {success: false};
            else return {success: true, hash: transHash};
        });
}

/**
 * Add a role to an address
 *
 * @param {address} address
 *
 * @param {RolesEnum} roleName
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function addRole(addr, roleName) {
    const accounts = await this.getAccounts();

    contract.methods.addRole(addr, roleName).send({
            from: accounts[0]
        },
        (err, transHash) => {
            if (err) return {success: false};
            else return {success: true, hash: transHash};
        });
}

/**
 * Remove a role from an address
 *
 * @param {address} address
 *
 * @param {RolesEnum} roleName
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function removeRole(addr, roleName) {
    const accounts = await this.getAccounts();

    contract.methods.removeRole(addr, roleName).send({
            from: accounts[0]
        },
        (err, transHash) => {
            if (err) return {success: false};
            else return {success: true, hash: transHash};
        });
}

/**
 * Sais if an user have an specific role
 *
 * @param {address} address
 *
 * @param {RolesEnum} roleName
 *
 * @return {Bool} Boolean value of the question has Specific Role.
 */
export async function hasSpecificRole(addr, roleName) {
    let has_role = false;
    const accounts = await this.getAccounts();

    contract.methods.hasSpecificRole(addr, roleName).call({ from: accounts[0] }, (err, h_role) => {
        if (err) console.log('ERROR!', err);
        else has_role = h_role;
    });
    return has_role;
}

/**
 * Return admin address
 *
 * @return {Adress} Return the address of the admin.
 */
export async function view_president_address() {
    let adm = '';
    const accounts = await this.getAccounts();

    contract.methods.view_president_address().call({ from: accounts[0] }, (err, admin) => {
        if (err) console.log('ERROR!', err);
        else adm = admin;
    });
    return adm;
}

/**
 * Get all the basic info of the citizen.
 * @param {number} id ID number
 * @return {Object} citizen Object with name, surname, birth date, gender, nationality, residence, city of the citizen and profile picture
 * */
export async function getCitizenBasicInfo(id) {
    let citizen = {name: '', surname: '', birthDate: '', gender: '', nationality: '', residence: '', city: '', idNum: '', profilePic: ''};

    // Get the accounts vector from our function
    const accounts = await this.getAccounts();

    // We had to split the Get's in 3 different methods in order to stop Remix complains
    // We call contract.methods.[SmartContractMethod](params)
    // Then .call, passing this object as parameter and assigning the elements of the res vector to our citizen object.
    contract.methods.get_name(id).call({ from: accounts[0] }, (err, res) => {
        if (err) console.log('ERROR!', err);
        else {
            citizen.idNum = res[0];
            citizen.name = res[1];
            citizen.surname = res[2];
        }
    });
    contract.methods.get_residency(id).call({ from: accounts[0] }, (err, res) => {
        if (err) console.log('ERROR!', err);
        else {
            citizen.nationality = res[2];
            citizen.residence = res[3];
            citizen.city = res[4];
        }
    });
    contract.methods.get_basic_info(id).call({ from: accounts[0] }, (err, res) => {
        if (err) console.log('ERROR!', err);
        else {
            citizen.birthDate = res[2];
            citizen.gender = res[3];
            citizen.profilePic = res[5];
        }
    });

    return citizen;
}

/*
TODO:
- Funcion añadir foto a IPFS
- Probar todas las funciones (hacer un programita)
- Cambiar byte32 por strings SOLO de la imagen
 */