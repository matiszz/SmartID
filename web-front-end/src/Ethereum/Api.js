import { web3, ipfs, contract } from "./config";

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
    let acc = await web3.eth.getAccounts();
    return acc;
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
    let citizen = {name: '', surname: '', birthDate: '', gender: '', nationality: '', residence: '', city: ''};
    contract.methods.get_name(id).send({
        from: this.getAccounts()[0],
    },
        (err, transHash, citizenData) => {
            console.log('HEY THERE', citizenData);
        })
}

/**
 * Get the name of the citizen.
 * @param {number} id ID number
 * @return {string} name Name of the citizen
 * */
export async function getPresidentAddress() {

}