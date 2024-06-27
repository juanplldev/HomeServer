// Dependencies
import RNFS from "react-native-fs";
// Files
import getApiPaths from "./getApiPaths";
import {showBackupProgressNotification, showBackupCompleteNotification, clearDisplayedNotification} from "./handleNotifications";
import {getDirContent, postFiles} from "../api";
import {DEST_FOLDER} from "@env";


export async function handleBackup()
{
    try
    {
        const destPaths = await getApiPaths(DEST_FOLDER);
        let pathsCount = 0;
        
        for (const path of destPaths)
        {
            const {files} = await getDirContent(path);
            
            const clientPath = path.split("/").splice(1).join("/");
            const clientDir = `${RNFS.ExternalStorageDirectoryPath}/${clientPath}`;
            const dirContent = await RNFS.readDir(clientDir).catch(e => console.error(e.Error, clientDir));
            const clientFiles = dirContent.filter(dirent => dirent.isFile());
            
            const newFiles = clientFiles?.filter(file => !files.includes(file.name));
            
            // if(newFiles.length) await postFiles(path, newFiles);
            // console.log(newFiles, path);
            
            pathsCount ++;
            
            const backupProgress = Math.round((pathsCount / destPaths.length) * 100);
            
            await showBackupProgressNotification(backupProgress, clientPath);
            
            if(backupProgress === 100)
            {
                await clearDisplayedNotification("1");
                await showBackupCompleteNotification();
                return;
            };
        };
    }
    catch (error)
    {
        console.error(error);
    };
};