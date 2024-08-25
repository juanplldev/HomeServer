// Dependencies
import notifee from "@notifee/react-native";


export async function showPreparingBackupNotification(progress)
{
    const channelId = await notifee.createChannel({
        id: "preparing",
        name: "Backup preparing progress",
        vibration: false,
    });
    
    await notifee.displayNotification({
        id: "1",
        title: "Backup in progress",
        body: `Preparing backup (${progress}%)`,
        android: {
            channelId,
            progress: {
                indeterminate: true,
            },
            ongoing: true,
            onlyAlertOnce: true,
            pressAction: {
                id: "default",
                launchActivity: "default",
            },
            showTimestamp: true,
        },
    });
};

export async function showBackupProgressNotification(progress, path, file="", uploadProgress=0)
{
    const splittedPath = path.split("/");
    
    let fixedPath = `/${path}`;
    
    if(file && splittedPath.length > 2)
    {
        const firstDir = splittedPath.shift();
        const lastDir = splittedPath.pop();
        
        fixedPath = `/${firstDir}/.../${lastDir}`;
    };
    
    const fixedName = file.length > 12 ? `${file.slice(0, 12)}...${file.split(".").pop()}` : file;
    const uploadingBody = file ? `${fixedPath}/${fixedName} (${uploadProgress}%)` : fixedPath;
    
    const channelId = await notifee.createChannel({
        id: "progress",
        name: "Backup upload progress",
        vibration: false,
    });
    
    await notifee.displayNotification({
        id: "2",
        title: "Backup in progress",
        subtitle: `${progress}%`,
        body: uploadingBody,
        android: {
            channelId,
            progress: {
                current: progress,
                max: 100,
                indeterminate: false,
            },
            ongoing: true,
            onlyAlertOnce: true,
            pressAction: {
                id: "default",
                launchActivity: "default",
            },
        },
    });
};

export async function showBackupCompleteNotification()
{
    const channelId = await notifee.createChannel({
        id: "complete",
        name: "Backup completed",
        vibration: false,
    });
    
    await notifee.displayNotification({
        id: "3",
        title: "Backup completed",
        android: {
            channelId,
            pressAction: {
                id: "default",
                launchActivity: "default",
            },
            showTimestamp: true,
        },
    });
};

export async function showUploadErrorNotification(path="", file="")
{
    const splittedPath = path.split("/");
    
    let fixedPath = `/${path}/${file}`;
    
    if(splittedPath.length > 2)
    {
        const firstDir = splittedPath.shift();
        const lastDir = splittedPath.pop();
        
        fixedPath = `/${firstDir}/.../${lastDir}/${file}`;
    };
    
    const channelId = await notifee.createChannel({
        id: "error",
        name: "Backup error",
        vibration: false,
    });
    
    await notifee.displayNotification({
        title: "Failed to upload",
        body: fixedPath,
        android: {
            channelId,
            pressAction: {
                id: "default",
                launchActivity: "default",
            },
            showTimestamp: true,
            groupId: "error_group",
            groupSummary: true,
        },
    });
    
    await notifee.displayNotification({
        title: "Failed to upload",
        body: fixedPath,
        android: {
            channelId,
            pressAction: {
                id: "default",
                launchActivity: "default",
            },
            showTimestamp: true,
            groupId: "error_group",
        },
    });
};

export async function clearDisplayedNotification(id)
{
    await notifee.cancelNotification(id);
};