import { web3 } from "./config";
import contract from "./config";
// Add ipfs when needed

/**
 * Returns the address of the Smart Contract
 */
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
 * @param {string} name Name of the citizen
 * @param {string} lastName Surname of the citizen
 * @param {string} gender Gender of the citizen
 * @param {string} nationality Nationality of the citizen
 * @param {string} residence Residence of the citizen
 * @param {string} city City of the citizen
 * @param {number} ID ID number of the citizen
 *
 * @return {Object} transHash Returns the Transaction Hash.
 */
export async function registerCitizen(name, lastName, birthDate, gender, nationality, residence, city, ID) {
    contract.methods.register_citizen(name, lastName, birthDate, gender, nationality, residence, city, ID).send({
        from: this.getAccounts()[0]
    },
        (err, transHash) => {
            if (err) console.error("Error al registrar ciudadano", err);
            else return transHash;
        });
}

/**
 * Get all the basic info of the citizen.
 * @param {number} id ID number
 * @return {Object} citizen Object with name, surname, birth date, gender, nationality, residence and city of the citizen
 * */
export async function getCitizenBasicInfo(id) {
    let citizen = {name: '', surname: '', birthDate: '', gender: '', nationality: '', residence: '', city: '', idNum: ''};

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
            citizen.gender = res[2];
        }
    });

    return citizen;
}