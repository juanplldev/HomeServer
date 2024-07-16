// Dependencies
import {Alert} from "react-native";
import RNFS from "react-native-fs";
// Files
import getApiPaths from "./getApiPaths";
import {showBackupProgressNotification, showBackupCompleteNotification, clearDisplayedNotification} from "./handleNotifications";
import {getDirContent, postFile, createDir} from "../api";
import formatFileName from "./formatFileName";
import checkNetInfo from "./checkNetInfo";
import {DEST_FOLDER} from "@env";


export async function handleBackupUpload()
{
    const isConnected = await checkNetInfo();
    
    if(isConnected)
    {
        try
        {
            await showBackupProgressNotification(0, "", "", 0);
            
            const destPaths = await getApiPaths(DEST_FOLDER);
            
            let pathsCount = 0;
            let backupProgress = 0;
            
            for (const path of destPaths)
            {
                const {directories, files} = await getDirContent(path);
                
                const clientPath = path.split("/").splice(1).join("/");
                const clientDir = `${RNFS.ExternalStorageDirectoryPath}/${clientPath}`;
                const dirContent = await RNFS.readDir(clientDir).catch(e => console.error("[RNFS Error] on 'getDirContent'. " + e));
                
                pathsCount ++;
                backupProgress = Math.round((pathsCount / destPaths.length) * 100);
                
                await showBackupProgressNotification(backupProgress, clientPath);
                
                for (const dirent of dirContent)
                {
                    const formatedFileName = formatFileName(dirent.name);
                    
                    if(dirent.isFile() && !files.includes(dirent.name) && !files.includes(formatedFileName))
                    {
                        await postFile(path, dirent, showBackupProgressNotification, backupProgress);
                    }
                    else if(dirent.isDirectory() && !directories.includes(dirent.name))
                    {
                        if(clientPath === "Android" || clientPath.split("/").shift() === "Android")
                        {
                            if(!dirent.name.includes(".") && dirent.path.includes("com.whatsapp"))
                            {
                                const newDir = `${path}/${dirent.name}`;
                                await createDir(newDir);
                            };
                        }
                        else if(!dirent.name.includes("."))
                        {
                            const newDir = `${path}/${dirent.name}`;
                            await createDir(newDir);
                        };
                    };
                };
                
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
    }
    else
    {
        Alert.alert("Network Error","Check WiFi connection");
    };
};