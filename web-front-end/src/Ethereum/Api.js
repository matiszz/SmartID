import { web3 } from "./config";
import contract from "./config";
import { ipfs } from './config';


export async function getImageIPFS(imageHash) {
    const Http = new XMLHttpRequest();
    const url='https://gateway.ipfs.io/ipfs/' + imageHash;
    Http.open("GET", url);
    Http.send();
    
    Http.onreadystatechange=function(){
        //comprobar si la petición se ha servido correctamente
        if(this.readyState==4 && this.status==200) {
            return(Http.responseText);
        }
        else return -1;
    }
}

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
    const rt = 0;


    const hashReg = new Promise (resolve => {
        contract.methods.register_citizen(citizen.name, citizen.surname, citizen.birthDate, citizen.gender, citizen.nationality, citizen.residence, citizen.city, citizen.idNum, citizen.profilePic,{from: accounts[0]},function(err, transHash) {
            if (err) {
                console.error(err);
                return {success: false};
            }
            else {
                const res = (transHash);
                console.log(res);
                rt = res;
            }
            resolve();
        });
    })
    await Promise.all(hashReg)
    return {success: true, hash: rt};
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
    const rt = 0;

    const hashModify = new Promise ( resolve => {
        contract.modify_citizen(citizen.name, citizen.surname, citizen.birthDate, citizen.gender, citizen.nationality, citizen.residence, citizen.city, citizen.idNum, citizen.profilePic,{from: accounts[0]},function(err, transHash) {
            if (err) {
                console.error(err);
                return {success: false};
            }
            else {
                const res = (transHash);
                console.log(res);
                rt = res;
            }
            resolve();
        });
    })
    await Promise.all(hashModify)
    return {success: true, hash: rt};
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
    const rt = 0;

    const hashReg = new Promise ( resolve => {
        contract.removeUser(id, {from: accounts[0]},function(err, transHash) {
            if (err) {
                console.error(err);
                return {success: false};
            }
            else {
                const res = (transHash);
                console.log(res);
                rt = res;
            }
            resolve();
        });
    })
    await Promise.all(hashReg)
    return {success: true, hash: rt};
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
    const rt = 0;

    const hashReg = new Promise ( resolve => {
        contract.registerClinicRecord(id, record, date,{from: accounts[0]}, function(err, transHash) {
                if (err) {
                    console.error(err);
                    return {success: false};
                }
                else {
                    const res = (transHash);
                    console.log(res);
                    rt = res;
                }
                resolve();
            });
        })
    await Promise.all(hashReg)
    return {success: true, hash: rt};
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
    const rt = 0;

    const hashReg = new Promise ( resolve => {
        contract.methods.registerLegalRecord(id, record, date,{from: accounts[0]}, function(err, transHash) {
                if (err) {
                    console.error(err);
                    return {success: false};
                }
                else {
                    const res = (transHash);
                    console.log(res);
                    rt = res;
                }
                resolve();
            });
        })
    await Promise.all(hashReg)
    return {success: true, hash: rt};
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
    const rt = 0; 

    const hashDel = new Promise(resolve => {
        contract.deleteClinicRecord(id, record_position,{from: accounts[0]},function(err, transHash) {
            if (err) {
                console.error(err);
                return {success: false};
            }
            else { 
                const res = (transHash);
                console.log(res);
                rt = res;
            }
            resolve();
        });
    })
    await Promise.all(hashDel)
    return {success: true, hash: rt};
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
    const rt = '';

    const hashDel = new Promise (resolve => {
	    contract.deleteLegalRecord(id, record_position,{from: accounts[0]},function(err, transHash) {
            if (err) {
                console.error(err);
                return {success: false};
            }
            else { 
                const res = (transHash);
                console.log(res);
                rt = res;
            }
            resolve();
        });
    })
    await Promise.all(hashDel)
    return {success: true, hash: rt};
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

    const lnght = new Promise(resolve => {
	    contract.getNumberClinicRecords(id, function(err, len) {
	        if (err) console.error(err);
	        else {
	        	const res = (len);
	        	lenght = res;
	        	console.log(res);
	     	}
        resolve();
    	});
	})
    await Promise.all(lnght)
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

    const lnght = new Promise(resolve => {
	    contract.getNumberLegalRecords(id, function(err, len) {
	        if (err) console.error(err);
	        else {
	        	const res = (len);
	        	lenght = res;
	        	console.log(res);
	     	}
        resolve();
    	});
	})
    await Promise.all(lnght)
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

    const pos = new Promise(resolve => {
	    contract.getClinicRecords(id, position, function(err, rec) {
	        if (err) console.error(err);
	        else {
	        	const res = (rec);
	        	record = res;
	        	console.log(res);
	        }
	        resolve();
		});
	})
	await Promise.all(pos)
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

    const pos = new Promise(resolve => {
	    contract.getLegalRecords(id, position, function(err, rec) {
	        if (err) console.error(err);
	        else {
	        	const res = (rec);
	        	record = res;
	        	console.log(res);
	        }
	        resolve();
	    });
	})
	await Promise.all(pos)
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
    const rt = 0;

    const hashChange = new Promise(resolve => {
        contract.methods.changeStatus(state,{from: accounts[0]},function(err, transHash) {
            if (err) {
                console.error(err);
                return {success: false};
            }
            else {
                const res = (transHash);
                rt = res;
                console.log(res)
            }
            resolve();
        });
    })
    await Promise.all(hashChange)
    return {success: true, hash: rt};
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
    const rt = 0;

    const hashAdd = new Promise(resolve => {
        contract.addRole(addr, roleName,{from: accounts[0]},function(err, transHash) {
                if (err) {
                    console.error(err);
                    return {success: false};}
                else {
                    const res = (transHash);
                    rt = res;
                    console.log(res)
                }
                resolve();
            });
    })
    await Promise.all(hashAdd)
    return {success: true, hash: rt};
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
    const rt = 0;

    const hashRemove = new Promise(resolve => {
        contract.methods.removeRole(addr, roleName,{from: accounts[0]},function(err, transHash) {
            if (err) {
                console.error(err);
                return {success: false};
            }
            else {
                const res = (transHash);
                console.log(res);
                rt = res;
            }
            resolve();
        });
    })
    await Promise.all(hashRemove)
    return {success: true, hash: rt};
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

    const rName = new Promise (resolve => {
	    contract.hasSpecificRole(addr, roleName,function(err,  h_role) {
	        if (err) console.error(err);
	        else {
	        	const res = (h_role);
	        	has_role = res;
	        	console.log(res);
	        }
	        resolve();
	    });
	})
	await Promise.all(rName)
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

    const address = new Promise(resolve => {
	    contract.view_president_address(function(err, result1) {
	        if (err) console.error(err);
	        else {
	        	const res = (result1);
	        	adm = res;
	        	console.log(res)
	        }
	        resolve();
	    });
	})
    await Promise.all(address)
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
    

    const name = new Promise(resolve =>  {
	    contract.get_name(id, function(err, result1) {
	        if (err) console.error(err);
	        else {
	        	const res = (result1);
	            citizen.idNum = res[0];
	            citizen.name = res[1];
	            citizen.surname = res[2];
	            console.log(res);
	        }
	        resolve();
	    });
	})

	   
	const residency = new Promise(resolve => {    
	    contract.get_residency(id, function(err, result2) {
	        if (err) console.error(err);
	        else {
	        	const res = (result2);
	            citizen.nationality = res[2];
	            citizen.residence = res[3];
	            citizen.city = res[4];
	            console.log(res);
	        }
	        resolve();
	    });
	})

    const basic = new Promise(resolve => {
	    contract.get_basic_info(id, function(err, result3) {
	        if (err) console.error(err);
	        else {
	        	const res = (result3);
	            citizen.birthDate = res[2];
	            citizen.gender = res[3];
	            citizen.profilePic = res[5];
	            console.log(res);
	        }
	        resolve();
	    });
	})

    //await Promise.all([name, residency, basic])
	//console.log(citizen)
	await Promise.all([name, residency, basic])
    return citizen;
}

/*
TODO:
-X	 Funcion añadir foto a IPFS
-	 Probar todas las funciones (hacer un programita)
-X	 Cambiar byte32 por strings SOLO de la imagen 
-X	 Añadir promises (ver Api de la App Movil)
 */