// Dependencies
import notifee, {AndroidImportance, TimestampTrigger, TriggerType} from "@notifee/react-native";

// async function onCreateTriggerNotification() {
//     const date = new Date(Date.now());
//     date.setHours(11);
//     date.setMinutes(10);

//     // Create a channel
//     const channelId = await notifee.createChannel({
//         id: "Default",
//         name: "Default-Channel",
//         importance: AndroidImportance.HIGH,
//     });

//     // Create a time-based trigger
//     const trigger = {
//         type: TriggerType.TIMESTAMP,
//         timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
//     };

//     // Create a trigger notification
//     await notifee.createTriggerNotification(
//         {
//             title: "Meeting with Jane",
//             body: "Today at 11:20am",
//             android: {
//                 channelId: "your-channel-id",
//             },
//         },
//         trigger,
//     );
// }


export async function showBackupProgressNotification(progress, path)
{
    const channelId = await notifee.createChannel({
        id: "progress",
        name: "Backup upload progress",
        vibration: false,
    });
    
    await notifee.displayNotification({
        id: "1",
        title: "Personal security copy",
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
    const channelId = await notifee.createChannel({
        id: "complete",
        name: "Backup completed",
        vibration: false,
    });
    
    await notifee.displayNotification({
        id: "2",
        title: "Personal security copy",
        body: `Completed successfully`,
        android: {
            channelId,
        },
    });
};

export async function clearDisplayedNotification(id)
{
    await notifee.cancelNotification(id);
};