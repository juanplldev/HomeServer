// Dependencies
import React, {useEffect, useState} from "react";
import {StyleSheet, View, Button, Alert, Text} from "react-native";
import RNFS from "react-native-fs";
// Files
import getApiPaths from "./utils/getApiPaths";
import {getDirContent, postFiles} from "./api";
import {DEST_FOLDER} from "@env";


export default function App()
{
    const [backupProgress, setBackupProgress] = useState(0);
    
    useEffect(() => {
        handleBackup();
    }, []);
    
    useEffect(() => {
        if(backupProgress >= 100) setBackupProgress(0);
    }, [backupProgress]);
    
    async function handleBackup()
    {
        try
        {
            const destPaths = await getApiPaths(DEST_FOLDER);
            // console.log(destPaths);
            let completedPaths = 0;
            
            const promises = destPaths.map(async path => {
                const {files} = await getDirContent(path);
                
                const clientPath = path.split("/").splice(1).join("/");
                const clientDir = `${RNFS.ExternalStorageDirectoryPath}/${clientPath}`;
                const dirContent = await RNFS.readDir(clientDir).catch(e => console.error(e.Error, clientDir));
                const clientFiles = dirContent.filter(dirent => dirent.isFile());
                
                const newFiles = clientFiles?.filter(file => !files.includes(file.name));
                
                // if(newFiles.length) await postFiles(path, newFiles);
                // console.log(newFiles, path);
                
                completedPaths += 1;
                
                const newProgress = Math.round((completedPaths / destPaths.length) * 100);
                
                setBackupProgress(newProgress);
            });
            
            await Promise.all(promises);
        }
        catch (error)
        {
            console.error(error);
        };
    };
    
    // console.log(backupProgress);
    
    return (
        <View style={styles.container}>
            <Button title="Backup" onPress={handleBackup}/>
            {/* <Text>Upload Progress: {backupProgress}%</Text> */}
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