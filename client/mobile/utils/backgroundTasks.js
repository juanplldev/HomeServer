// Dependencies
import BackgroundFetch from "react-native-background-fetch";
// Files
import {handleBackup} from "./handleBackup";


export async function initBackupTask()
{
    try
    {
        await BackgroundFetch.configure(
            {
                minimumFetchInterval: 15,
                stopOnTerminate: false,
                startOnBoot: true,
                requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
                enableHeadless: true,
            },
            async (taskId) => {
                console.log("[BackgroundFetch] taskId:", taskId);
                await handleBackup();
                BackgroundFetch.finish(taskId);
            },
            (taskId) => {
                console.error("[BackgroundFetch] failed to start", taskId);
                BackgroundFetch.finish(taskId);
            },
        );
        
        await BackgroundFetch.scheduleTask({
            taskId: "com.mobile.backup",
            // delay: 4 * 60 * 60 * 1000,
            delay: 1000,
            periodic: true,
            stopOnTerminate: false,
            startOnBoot: true,
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
            requiresNetworkConnectivity: true,
            enableHeadless: true,
        });
    }
    catch (error)
    {
        console.error(error);
    }
};