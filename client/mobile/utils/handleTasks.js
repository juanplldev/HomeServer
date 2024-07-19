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
                minimumFetchInterval: 120,
                stopOnTerminate: false,
                startOnBoot: true,
                enableHeadless: true,
                requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
            },
            async (taskId) => {
                console.log("[BackgroundFetch] taskId:", taskId);
                const now = new Date();
                
                if(now.getHours() >= 3 && now.getHours() <= 5)
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
            taskId: "com.mobile.backup_task",
            delay: 0,
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

export async function backupHeadlessTask(event)
{
    console.log('[BackgroundFetch HeadlessTask] start');
    
    const taskId = event?.taskId;
    const now = new Date();
    
    try
    {
        if(event.timeout)
        {
            console.warn("[BackgroundFetch] Headless TIMEOUT:", taskId);
            BackgroundFetch.finish(taskId);
            return;
        };
        
        if(now.getHours() >= 3 && now.getHours() <= 5)
        {
            await handleBackupUpload();
        };
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