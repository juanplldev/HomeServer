// Dependencies
import {fetch} from "@react-native-community/netinfo";
// Files
import {WIFI_IP} from "@env";


export default async function checkNetInfo()
{
    const state = await fetch();
    
    if(state.type === "wifi") return state.details.ipAddress === WIFI_IP;
};