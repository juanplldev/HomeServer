// Dependencies
import notifee from "@notifee/react-native";


export async function showBackupProgressNotification(progress, path)
{
    notifee.onBackgroundEvent(async () => {});
    
    const channelId = await notifee.createChannel({
        id: "progress",
        name: "Backup upload progress",
        vibration: false,
    });
    
    await notifee.displayNotification({
        id: "1",
        title: "Personal backup",
        subtitle: `${progress}%`,
        body: `Uploading: ${path}/`,
        android: {
            channelId,
            progress: {
                current: progress,
                max: 100,
            },
            ongoing: true,
            onlyAlertOnce: true,
        },
    });
};

export async function showBackupCompleteNotification()
{
    notifee.onBackgroundEvent(async () => {});
    
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
        },
    });
};

export async function clearDisplayedNotification(id)
{
    notifee.onBackgroundEvent(async () => {});
    
    await notifee.cancelNotification(id);
};