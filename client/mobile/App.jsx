// Dependencies
import React, {useEffect} from "react";
import {StyleSheet, View, Button, Alert, Text} from "react-native";
import RNFS from "react-native-fs";
// Files
import getApiPaths from "./utils/getApiPaths";
import {showBackupProgressNotification, showBackupCompleteNotification, clearDisplayedNotification} from "./utils/handleNotifications";
import {getDirContent, postFiles} from "./api";
import {DEST_FOLDER} from "@env";


export default function App()
{
    useEffect(() => {
        // handleBackup();
    }, []);
    
    
    async function handleBackup()
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
    
    
    return (
        <View style={styles.container}>
            <Button title="Backup" onPress={handleBackup}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});