import { NotificationManager } from 'react-notifications';

export function success(hash) {
    console.info('Hey developer! Petition sent succesfully. Please check state in http://ropsten.etherscan.io/tx/' + hash);
    NotificationManager.success("This could take some minutes", "Petition sent successfully", 4000)
}