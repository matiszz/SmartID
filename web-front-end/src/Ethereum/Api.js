import {web3, ipfs} from './config';
import contract from './config';

/**
 * Returns an array with all the accounts.
 */
export async function getAccounts() {
    let allAccounts = await web3.eth.getAccounts();
    return allAccounts[0];
}

/* Citizen management functions*/
/**
 * Registers a new citizen.
 *
 * @param {Object} citizen Citizen object
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function registerCitizen(citizen) {
    const account = await this.getAccounts();
    let returnedHash;

    const hashReg = new Promise(resolve => {

        ipfs.add(citizen.picture, (err, ipfsHash) => {
            if (err) {
                return {success: false};
            } else {
                contract.methods.register_citizen(
                    citizen.name,
                    citizen.surname,
                    citizen.birthDate,
                    citizen.gender,
                    citizen.nationality,
                    citizen.residence,
                    citizen.city,
                    citizen.idNum,
                    ipfsHash[0].hash).send({from: account}, (err, transHash) => {
                        if (err) {
                            console.error('An error occurred on the registerCitizen function', 'Error on register', err);
                            return {success: false};
                        } else {
                            returnedHash = transHash;
                        }
                        resolve();
                    });
            }
        });
    });

    await Promise.all([hashReg]);
    return {success: true, hash: returnedHash};
}

/**
 * Change some atributes from a citizen.
 *
 * @param {Object} citizen Citizen object
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function modifyCitizen(citizen) {
    const account = await this.getAccounts();
    let returnedHash;

    if (citizen.pictureChange) {
        const imagePromise = new Promise(resolve => {
            ipfs.add(citizen.picture, (err, ipfsHash) => {
                if (err) {
                    return {success: false};
                } else {
                    contract.methods.modify_citizen(
                        citizen.name,
                        citizen.surname,
                        citizen.birthDate,
                        citizen.gender,
                        citizen.nationality,
                        citizen.residence,
                        citizen.city,
                        citizen.idNum,
                        ipfsHash[0].hash)
                        .send({from: account}, (err, transHash) => {
                            if (err) {
                                console.error('An error occurred on the modifyCitizen function', err);
                                return {success: false};
                            } else {
                                returnedHash = transHash;
                            }
                            resolve();
                        });
                }
            });
        });

        await Promise.all([imagePromise]);
        return {success: true, hash: returnedHash};
    } else {
        const hashModify = new Promise(resolve => {
            contract.methods.modify_citizen(
                citizen.name,
                citizen.surname,
                citizen.birthDate,
                citizen.gender,
                citizen.nationality,
                citizen.residence,
                citizen.city,
                citizen.idNum,
                citizen.picture).send({from: account}, (err, transHash) => {
                if (err) {
                    console.error('An error occurred on the modifyCitizen function', err);
                    return {success: false};
                } else {
                    returnedHash = transHash;
                }
                resolve();
            });
        });
        await Promise.all([hashModify]);
        return {success: true, hash: returnedHash};
    }
}



/* Records management functions */
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
    const account = await this.getAccounts();
    let returnedHash;

    const hashReg = new Promise(resolve => {
        contract.methods.registerClinicRecord(id, record, date).send({from: account}, (err, transHash) => {
            if (err) {
                console.error('An error occurred on the registerClinicRecord function', err);
                return {success: false};
            } else {
                returnedHash = transHash;
            }
            resolve();
        });
    });

    await Promise.all([hashReg]);
    return {success: true, hash: returnedHash};
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
    const account = await this.getAccounts();
    let returnedHash;

    const hashReg = new Promise(resolve => {
        contract.methods.registerLegalRecord(id, record, date).send({from: account}, (err, transHash) => {
            if (err) {
                console.error('An error occurred on the registerLegalRecord function', err);
                return {success: false};
            } else {
                returnedHash = transHash;
            }
            resolve();
        });
    });

    await Promise.all([hashReg]);
    return {success: true, hash: returnedHash};
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
    const account = await this.getAccounts();
    let returnedHash;

    const hashDel = new Promise(resolve => {
        contract.methods.deleteClinicRecord(id, record_position).send({from: account}, (err, transHash) => {
            if (err) {
                console.error('An error occurred on the deleteClinicRecord function', err);
                return {success: false};
            } else {
                returnedHash = transHash;
            }
            resolve();
        });
    });

    await Promise.all([hashDel]);
    return {success: true, hash: returnedHash};
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
    const account = await this.getAccounts();
    let returnedHash;

    const hashDel = new Promise(resolve => {
        contract.methods.deleteLegalRecord(id, record_position).send({from: account}, (err, transHash) => {
            if (err) {
                console.error('An error occurred on the deleteLegalRecord function', err);
                return {success: false};
            } else {
                returnedHash = transHash;
            }
            resolve();
        });
    });

    await Promise.all([hashDel]);
    return {success: true, hash: returnedHash};
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
    const account = await this.getAccounts();

    const lnght = new Promise(resolve => {
        contract.methods.getNumberClinicRecords(id).call({from: account}, (err, len) => {
            if (err) console.error('An error occurred on the getNumberClinicRecords function', err);
            else {
                const res = (len);
                lenght = parseInt(res, 10);
            }
            resolve();
        });
    });

    await Promise.all([lnght]);
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
    const account = await this.getAccounts();

    const lnght = new Promise(resolve => {
        contract.methods.getNumberLegalRecords(id).call({from: account}, (err, len) => {

            if (err) console.error('An error occurred on the getNumberLegalRecords function', err);
            else {
                const res = (len);
                lenght = parseInt(res, 10);
            }
            resolve();

        });
    });

    await Promise.all([lnght]);
    return lenght;
}

/**
 * Give a specific clinic record of the citizen
 *
 * @param {number} id ID number
 *
 * @return {Object} clinic record.
 */
export async function getClinicRecord(id, position) {
    let record = '';
    const account = await this.getAccounts();

    const pos = new Promise(resolve => {
        contract.methods.getClinicRecords(id, position).call({from: account}, (err, rec) => {
            if (err) console.error('An error occurred on the getClinicRecord function', err);
            else {
                const res = (rec);
                record = res;
            }
            resolve();
        });
    });

    await Promise.all([pos]);
    return record;
}

/**
 * Give a specific legal record of the citizen
 *
 * @param {number} id ID number
 *
 * @return {Object} legal record.
 */
export async function getLegalRecord(id, position) {
    const account = await this.getAccounts();

    return new Promise(resolve => {
        contract.methods.getLegalRecords(id, position).call({from: account}, (err, rec) => {
            if (err) {
                console.error('An error occurred on the getLegalRecord function', err);
            }
            resolve(rec);
        });
    });
}

/**
 * Give all the legal records of the citizen
 *
 * @param {number} id ID number
 *
 * @return {Object} LegalRecords Legal records array
 */
export async function getLegalRecords(id) {
    let len = await this.getNumberLegalRecords(id);

    return Promise.all(
        [...Array(len).keys()]
            .map(position => this.getLegalRecord(id, position))
    );
}

/**
 * Give all the clinic records of the citizen
 *
 * @param {number} id ID number
 *
 * @return {Object} ClinicRecords Clinic records array
 */
export async function getClinicRecords(id) {
    let len = await this.getNumberClinicRecords(id);

    return Promise.all(
        [...Array(len).keys()]
            .map(position => this.getClinicRecord(id, position))
    );
}



/* Smart Contract functions*/
/**
 * Change the Smart Contract stete
 *
 * @param {bool} new state
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function changeStatus(state) {
    const account = await this.getAccounts();
    let returnedHash;

    const hashChange = new Promise(resolve => {
        contract.methods.changeStatus(state).send({from: account}, (err, transHash) => {
            if (err) {
                console.error('An error occurred on the changeStatus function', err);
                return {success: false};
            } else {
                returnedHash = transHash;
            }
            resolve();
        });
    });

    await Promise.all([hashChange]);
    return {success: true, hash: returnedHash};
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
    const account = await this.getAccounts();
    let returnedHash;
    let roleNum;

    switch (roleName) {
        case 'Presi':
            roleNum = 0; break;
        case 'Police':
            roleNum = 1; break;
        case 'Doctor':
            roleNum = 2; break;
        case 'Admin':
            roleNum = 3; break;
    }

    const hashAdd = new Promise(resolve => {
        contract.methods.addRole(addr, roleNum).send({from: account}, (err, transHash) => {
            if (err) {
                console.error('An error occurred on the addRole function', err);
                return {success: false};
            } else {
                returnedHash = transHash;
            }
            resolve();
        });
    });

    await Promise.all([hashAdd]);
    return {success: true, hash: returnedHash};
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
    const account = await this.getAccounts();
    let returnedHash;
    let roleNum;

    switch (roleName) {
        case 'Presi':
            roleNum = 0; break;
        case 'Police':
            roleNum = 1; break;
        case 'Doctor':
            roleNum = 2; break;
        case 'Admin':
            roleNum = 3; break;
    }

    const hashRemove = new Promise(resolve => {
        contract.methods.removeRole(addr, roleNum).send({from: account}, (err, transHash) => {
            if (err) {
                console.error('An error occurred on the removeRole function', err);
                return {success: false};
            } else {
                returnedHash = transHash;
            }
            resolve();
        });
    });

    await Promise.all([hashRemove]);
    return {success: true, hash: returnedHash};
}

/**
 * Says if an user have an specific role
 *
 * @param {address} address
 *
 * @param {RolesEnum} roleName Role: Presi, Police, Doctor or Admin
 *
 * @return {Bool} Boolean value of the question has Specific Role.
 */
export async function hasSpecificRole(addr, roleName) {
    let has_role = false;
    const account = await this.getAccounts();
    let roleNum;

    switch (roleName) {
        case 'Presi':
            roleNum = 0; break;
        case 'Police':
            roleNum = 1; break;
        case 'Doctor':
            roleNum = 2; break;
        case 'Admin':
            roleNum = 3; break;
    }

    const rName = new Promise(resolve => {
        contract.methods.hasSpecificRole(addr, roleNum).call({from: account}, (err, h_role) => {
            if (err) console.error('An error occurred on the hasSpecificRole function', err);
            else {
                const res = (h_role);
                has_role = res;
            }
            resolve();
        });
    });

    await Promise.all([rName]);
    return has_role;
}

/**
 * Returns true if is Admin
 *
 * @return {Bool} Boolean value of the question has Specific Role.
 */
export async function isAdmin() {
    const account = await this.getAccounts();
    let user = account;

    return await this.hasSpecificRole(user, 'Admin');
}

/**
 * Returns true if is Doctor
 *
 * @return {Bool} Boolean value of the question has Specific Role.
 */
export async function isDoctor() {
    const account = await this.getAccounts();
    let user = account;

    return await this.hasSpecificRole(user, 'Doctor');
}

/**
 * Returns true if is President
 *
 * @return {Bool} Boolean value of the question has Specific Role.
 */
export async function isPresi() {
    const account = await this.getAccounts();
    let user = account;

    return await this.hasSpecificRole(user, 'Presi');
}

/**
 * Returns true if is Police
 *
 * @return {Bool} Boolean value of the question has Specific Role.
 */
export async function isPolice() {
    const account = await this.getAccounts();
    let user = account;

    return await this.hasSpecificRole(user, 'Police');
}

/**
 * Return admin address
 *
 * @return {Adress} Return the address of the admin.
 */
export async function getPresidentAddress() {
    let admin = '';
    const account = await this.getAccounts();

    const address = new Promise(resolve => {
        contract.methods.view_president_address().call({from: account}, (err, result1) => {
            if (err)
                console.error('An error occurred on the getPresidentAddress function', err);
            else
                admin = result1;
            resolve();
        });
    });

    await Promise.all([address]);
    return admin;
}

/**
 * Get all the basic info of the citizen.
 * @param {number} id ID number
 * @return {Object} citizen Object with name, surname, birth date, gender, nationality, residence, city of the citizen and profile picture
 * */
export async function getCitizenBasicInfo(id) {
    let citizen = {
        name: '',
        surname: '',
        birthDate: '',
        gender: '',
        nationality: '',
        residence: '',
        city: '',
        idNum: '',
        picture: ''
    };

    const account = await this.getAccounts();

    // We had to split the Get's in 3 different methods in order to stop Remix complains
    // We call contract.methods.[SmartContractMethod](params)
    // Then .call, passing this object as parameter and assigning the elements of the res vector to our citizen object.
    const name = new Promise(resolve => {
        contract.methods.get_name(id).call({from: account}, (err, result1) => {
            if (err) console.error('An error occurred on the getCitizenBasicInfo function', err);
            else {
                const res = (result1);
                citizen.idNum = res[0];
                citizen.name = res[1];
                citizen.surname = res[2];
            }
            resolve();
        });
    });

    const residency = new Promise(resolve => {
        contract.methods.get_residency(id).call({from: account}, (err, result2) => {
            if (err) console.error('An error occurred on the getCitizenBasicInfo function', err);
            else {
                const res = (result2);
                citizen.nationality = res[2];
                citizen.residence = res[3];
                citizen.city = res[4];
            }
            resolve();
        });
    });

    const basic = new Promise(resolve => {
        contract.methods.get_basic_info(id).call({from: account}, (err, result3) => {
            if (err) console.error('An error occurred on the getCitizenBasicInfo function', err);
            else {
                const res = (result3);
                citizen.birthDate = res[2];
                citizen.gender = res[3];
                citizen.picture = res[5];
            }
            resolve();
        });
    });

    await Promise.all([name, residency, basic]);
    return citizen;
}