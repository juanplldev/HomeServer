// Dependencies
import {Alert} from "react-native";
import RNFS from "react-native-fs";
// Files
import getApiPaths from "./getApiPaths";
import {showPreparingBackupNotification, showBackupProgressNotification, showBackupCompleteNotification, showUploadErrorNotification, clearDisplayedNotification} from "./handleNotifications";
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
            await showPreparingBackupNotification(0);
            
            const destPaths = await getApiPaths(DEST_FOLDER);
            const newFiles = await prepareBackup(destPaths);
            // const newFiles = 12;
            console.log("[New files]:", newFiles);
            
            let filesCount = 0;
            let backupProgress = 0;
            
            for (const path of destPaths)
            {
                const clientPath = path.split("/").splice(1).join("/");
                
                await showBackupProgressNotification(backupProgress, clientPath);
                
                const {files} = await getDirContent(path);
                
                const clientDir = `${RNFS.ExternalStorageDirectoryPath}/${clientPath}`;
                const dirContent = await RNFS.readDir(clientDir).catch(e => console.error("[RNFS Error] on 'getDirContent'. " + e));
                
                for (const dirent of dirContent)
                {
                    const formatedFileName = formatFileName(dirent.name);
                    
                    if(dirent.isFile() && !dirent.name.startsWith(".") && !files.includes(dirent.name) && !files.includes(formatedFileName))
                    {
                        try
                        {
                            filesCount++;
                            backupProgress = Math.round((filesCount / newFiles) * 100);
                            
                            async function handleUploadProgress(progressEvent)
                            {
                                const uploadProgress = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                                
                                await showBackupProgressNotification(backupProgress, clientPath, dirent.name, uploadProgress);
                            };
                            
                            await postFile(path, dirent, handleUploadProgress);
                        }
                        catch(error)
                        {
                            await showUploadErrorNotification(clientPath, dirent.name);
                        };
                    };
                };
                
                if(backupProgress === 100)
                {
                    await clearDisplayedNotification("2");
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
        Alert.alert("Network Error","Check Wi-Fi connection");
    };
};


async function prepareBackup(destPaths)
{
    let pathsCount = 0;
    let preparingProgress = 0;
    let newFiles = 0;
    
    for (const path of destPaths)
    {
        const {directories, files} = await getDirContent(path);
        
        const clientPath = path.split("/").splice(1).join("/");
        const clientDir = `${RNFS.ExternalStorageDirectoryPath}/${clientPath}`;
        const dirContent = await RNFS.readDir(clientDir).catch(e => console.error("[RNFS Error] on 'getDirContent'. " + e));
        
        for (const dirent of dirContent)
        {
            const formatedFileName = formatFileName(dirent.name);
            
            if(dirent.isFile() && !dirent.name.startsWith(".") && !files.includes(dirent.name) && !files.includes(formatedFileName))
            {
                newFiles++;
            }
            else if(dirent.isDirectory() && !directories.includes(dirent.name))
            {
                if(clientPath === "Android" || clientPath.split("/").shift() === "Android")
                {
                    if(!dirent.name.includes(".") && dirent.path.includes("com.whatsapp"))
                    {
                        const newDir = `${path}/${dirent.name}`;
                        await createDir(newDir);
                        destPaths.push(newDir);
                    };
                }
                else if(!dirent.name.includes("."))
                {
                    const newDir = `${path}/${dirent.name}`;
                    await createDir(newDir);
                    destPaths.push(newDir);
                };
            };
        };
        
        pathsCount ++;
        preparingProgress = Math.round((pathsCount / destPaths.length) * 100);
        
        await showPreparingBackupNotification(preparingProgress);
    };
    
    await clearDisplayedNotification("1");
    
    return newFiles;
};