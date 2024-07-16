// Dependencies
import notifee from "@notifee/react-native";


export async function showBackupProgressNotification(progress, path, file="", uploadProgress="")
{
    const preparing = progress === 0;
    
    const channelId = await notifee.createChannel({
        id: "progress",
        name: "Backup upload progress",
        vibration: false,
    });
    
    await notifee.displayNotification({
        id: "1",
        title: "Personal backup",
        subtitle: `${progress}%`,
        body: preparing ? "Preparing..." : `Uploading: /${path}/${file.length > 16 ? file.slice(0, 16) + "..." : file} ${uploadProgress && uploadProgress + "%"}`,
        android: {
            channelId,
            progress: {
                current: progress,
                max: 100,
                indeterminate: preparing,
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
        id: "2",
        title: "Personal backup",
        body: `Completed successfully`,
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

export async function clearDisplayedNotification(id)
{
    await notifee.cancelNotification(id);
};