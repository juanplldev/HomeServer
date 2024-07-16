// Dependencies
import BackgroundFetch from "react-native-background-fetch";
// Files
import {handleBackupUpload} from "./handleBackupUpload";


export async function initBackupTask()
{
    try
    {
        await BackgroundFetch.configure(
            {
                minimumFetchInterval: 15,
                stopOnTerminate: false,
                startOnBoot: true,
                enableHeadless: true,
                requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
            },
            async (taskId) => {
                console.log("[BackgroundFetch] taskId:", taskId);
                const now = new Date();
                
                if(now.getHours() > 2 && now.getHours() < 5)
                {
                    await handleBackupUpload();
                };
                
                BackgroundFetch.finish(taskId);
            },
            (taskId) => {
                console.error("[BackgroundFetch] failed to start", taskId);
                BackgroundFetch.finish(taskId);
            },
        );
        
        await BackgroundFetch.scheduleTask({
            taskId: "react-native-background-fetch",
            delay: 60 * 1000 * 60,
            periodic: true,
            stopOnTerminate: false,
            startOnBoot: true,
            enableHeadless: true,
            requiresNetworkConnectivity: true,
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        });
    }
    catch (error)
    {
        console.error("Error starting daily backup task", error);
    };
};

export async function setBackupHeadlessTask(event)
{
    const taskId = event?.taskId;
    
    try
    {
        if(event.timeout)
        {
            console.warn("[BackgroundFetch] Headless TIMEOUT:", taskId);
            BackgroundFetch.finish(taskId);
            return;
        };
        
        await handleBackupUpload();
    }
    catch (error)
    {
        console.error('[BackgroundFetch HeadlessTask] error', error);
    }
    finally
    {
        BackgroundFetch.finish(taskId);
    };
};