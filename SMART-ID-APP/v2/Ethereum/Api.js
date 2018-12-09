import { web3 } from "./config";
import contract from "./config";

/**
 * Get all the basic info of the citizen.
 * @param {number} id ID number
 * @return {Object} citizen Object with name, surname, birth date, gender, nationality, residence and city of the citizen
 * */
export async function getCitizenBasicInfo(id) {
    let citizen = {name: '', surname: '', birthDate: '', gender: '', nationality: '', residence: '', city: '', idNum: '',image: ''};

    // Get the accounts vector from our function
    //const accounts = await getAccounts();
    // We had to split the Get's in 3 different methods in order to stop Remix complains
    // We call contract.methods.[SmartContractMethod](params)
    // Then .call, passing this object as parameter and assigning the elements of the res vector to our citizen object.
    
    const name = new Promise(resolve => {
    contract.get_name(id, function(error, result1){
       if(!error){
            const res = (result1);
            citizen.idNum = res[0];
            citizen.name = res[1];
            citizen.surname = res[2];
           console.log(citizen);
       }else{
           console.error(error);
       }
      resolve();
    });
  })
    const residency = new Promise(resolve => {
    contract.get_residency(id, function(error, result2){
       if(!error){
            const res = (result2);
            citizen.nationality = res[2];
            citizen.residence = res[3];
            citizen.city = res[4];
           console.log(res);
       }else{
           console.error(error);
       }
      resolve();
    });
  })


 const basic = new Promise(resolve => {
    contract.get_basic_info(id, function(error, result3){
       if(!error){
            const res = (result3);
            citizen.birthDate = res[2];
            citizen.gender = res[3];
            citizen.image = res[5];
           console.log(res);
       }else{
           console.error(error);
       }
      resolve();
    });
  })

//await Promise.all([name, residency, basic])
//console.log(citizen)
await Promise.all([name, residency, basic])
return citizen;
}